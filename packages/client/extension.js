const path = require("path");
const { LanguageClient, TransportKind } = require("vscode-languageclient/node");

function activate(context) {
  const serverModule = context.asAbsolutePath(
    path.join("node_modules", "http-language-server", "src", "server.js")
  );
  const debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };

  console.log("RUNNING");

  const serverOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  const clientOptions = {
    documentSelector: [{ scheme: "file", language: "plaintext" }],
  };

  const client = new LanguageClient(
    "httpLanguageServer",
    "HTTP Language Server",
    serverOptions,
    clientOptions
  );

  client.start();
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
