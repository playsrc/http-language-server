import re

from pygls.server import LanguageServer
from lsprotocol.types import (
    TEXT_DOCUMENT_COMPLETION,
    TEXT_DOCUMENT_DID_CHANGE,
    TEXT_DOCUMENT_DID_OPEN,
    TEXT_DOCUMENT_HOVER,
    HoverParams,
    Hover,
    DidOpenTextDocumentParams,
    CompletionItem,
    CompletionList,
    CompletionParams,
    DidChangeTextDocumentParams,
    Diagnostic,
    Position,
    Range,
    MarkupContent,
    MarkupKind,
)

server = LanguageServer("http-language-server", "v0.1")


@server.feature(TEXT_DOCUMENT_DID_CHANGE)
async def did_change(ls: LanguageServer, params: DidChangeTextDocumentParams):
    text_document = ls.workspace.get_document(params.text_document.uri)
    text = text_document.source
    pattern = r"\b(?!GET|POST)[A-Z]{3,7}\b"
    diagnostics = []

    # Iterate through all the matches in the input string and get their start and end positions
    matches = re.finditer(pattern, text)
    for match in matches:
        start_pos = match.start()
        end_pos = match.end()

        # Determine the line number and character position of the match
        line_num = text.count("\n", 0, start_pos)
        start_char_pos = start_pos - text.rfind("\n", 0, start_pos) - 1
        end_char_pos = end_pos - text.rfind("\n", 0, end_pos) - 1

        # For debug
        # ls.show_message_log(
        #     f"Match: {match.group()} on line zero based {line_num}, starting character {start_char_pos}, ending character {end_char_pos}")

        d = Diagnostic(
            severity=4,
            range=Range(
                start=Position(line=line_num, character=start_char_pos),
                end=Position(line=line_num, character=end_char_pos),
            ),
            message=f"{match.group()} is not a POST or GET method.",
            source="HTTP Language Server",
        )

        diagnostics.append(d)

    ls.publish_diagnostics(text_document.uri, diagnostics)


@server.feature(TEXT_DOCUMENT_DID_OPEN)
async def did_open(ls, params: DidOpenTextDocumentParams):
    ls.show_message("Text Document Did Open")


@server.feature(TEXT_DOCUMENT_COMPLETION)
def completions(params: CompletionParams):
    return CompletionList(
        is_incomplete=False,
        items=[
            CompletionItem(
                label="GET",
                kind=21,
                detail="GET details",
                documentation="The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.",
            ),
            CompletionItem(
                label="POST",
                kind=21,
                detail="POST details",
                documentation="The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server.",
            ),
        ],
    )


@server.feature(TEXT_DOCUMENT_HOVER)
def hover(ls: LanguageServer, params: HoverParams):
    text_document = ls.workspace.get_document(params.text_document.uri)
    re_start_word = re.compile("[^\\s:=]*$")
    re_end_word = re.compile("^[^\\s:=]*")
    word = text_document.word_at_position(params.position, re_start_word, re_end_word)

    if not word:
        return

    # For debug
    # ls.show_message_log(f"HOVER: {word}")

    if word == "POST":
        return Hover(
            MarkupContent(
                kind=MarkupKind.Markdown,
                value="### POST Method\n"
                + "---\n"
                + "The `POST` method submits an entity to the specified resource, often causing a change in state or side effects on the server.\n\n"
                + "[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)\n",
            ),
        )

    if word == "GET":
        return Hover(
            MarkupContent(
                kind=MarkupKind.Markdown,
                value="### GET Method\n"
                + "---\n"
                + "The `GET` method requests a representation of the specified resource. Requests using GET should only retrieve data.\n\n"
                + "[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)\n",
            ),
        )

