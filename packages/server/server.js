#!/usr/bin/env node

const { TextDocument } = require("vscode-languageserver-textdocument");
const {
  createConnection,
  TextDocuments,
  MarkupKind,
} = require("vscode-languageserver/node");

const codes = require("./codes.json");

const connection = createConnection();
const documents = new TextDocuments(TextDocument);

connection.onInitialize(() => ({
  capabilities: {
    hoverProvider: true,
  },
}));

connection.onHover((params) => {
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
});

documents.listen(connection);
connection.listen();
