const codes = require("../docs/status.json");
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

  let status;

  codes.forEach((entry) => {
    const foundStatus = entry.content.find(
      (s) => s.code.split(" ")[0] === underCursor
    );
    if (foundStatus) {
      status = {
        code: foundStatus.code,
        category: entry.category,
        description: foundStatus.description.replace(/\s+/g, " ").trim(),
        source: foundStatus.source,
      };
    }
  });

  if (!status) {
    return { contents: [] };
  }

  const markdown = {
    kind: MarkupKind.Markdown,
    value: [
      `### ${status.code}\n`,
      `---`,
      `*${status.category}*\n`,
      `${status.description}\n`,
      `[MDN Reference](${status.source})\n`,
    ].join("\n"),
  };

  return {
    contents: markdown,
  };
}

module.exports = { hoverProvider };
