import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext): void {
	console.log("CLIENT RUNNING!");

	const serverOptions: ServerOptions = {
        args: ["-m", "server"],
        command: "python",
        options: {
            cwd: path.join(__dirname, "..",  "../server"),
        }
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [
            { scheme: 'file', language: 'plaintext' },
            { scheme: 'untitled', language: 'plaintext' }
        ],
        outputChannelName: "HTTP Language Server",
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'HTTP Language Server',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
    client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
