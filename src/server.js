const { hoverProvider } = require("./providers/hoverProvider");
const { TextDocument } = require("vscode-languageserver-textdocument");
const {
  createConnection,
  TextDocuments,
} = require("vscode-languageserver/node");

const connection = createConnection();
const documents = new TextDocuments(TextDocument);

connection.onInitialize(() => ({
  capabilities: {
    hoverProvider: true,
  },
}));

connection.onHover((params) => hoverProvider(params, documents));

documents.listen(connection);
connection.listen();
