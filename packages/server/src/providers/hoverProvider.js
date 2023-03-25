const codes = require("../docs/codes.json");
const { MarkupKind } = require("vscode-languageserver/node");

function hoverProvider(params, documents) {
  const document = documents.get(params.textDocument.uri);

  if (!document) {
    return { contents: [] };
  }

  const statusRegex = /\d{3}/gm;
  const numberRegex = /\d/gm;

  const start = {
    line: params.position.line,
    character: params.position.character,
  };
  const end = {
    line: start.line,
    character: start.character + 3,
  };

  let underCursor = document.getText({ start, end });

  if (!underCursor.match(numberRegex)) {
    return { contents: [] };
  }

  while (!underCursor.match(statusRegex)) {
    start.character--;
    end.character--;
    underCursor = document.getText({ start, end });
  }

  const status = codes.find((s) => s.Value.toString() === underCursor);

  if (!status) {
    return { contents: [] };
  }

  const markdown = {
    kind: MarkupKind.Markdown,
    value: [`### ${status.Description}\n`, `${status.Reference}\n`].join("\n"),
  };

  return {
    contents: markdown,
  };
}

module.exports = { hoverProvider };
