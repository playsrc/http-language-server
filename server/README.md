# HTTP Language Server

This is a LSP implementation for HTTP. With this project you can easily write your HTTP messages and requests by leveraging features like completion, hover documentation and diagnostics.

## Motivation

The HTTP Language Server was created to address the need for an efficient and reliable way to write HTTP messages and requests. Traditional methods of writing requests don't always provide proper tooling and are prone to errors. The HTTP Language Server simplifies the process by providing features that make it easier to write HTTP requests.

## Quick setup

1. Create a new virtual environment: `python -m venv venv`
2. Install the required dependencies: `python -m pip install -r requirements.txt`
3. Create `.vscode/settings.json` file and set `python.interpreterPath` to point to your python environment where `pygls` is installed

## Development

Contributions are welcome! Please create an [Issue](https://github.com/mateusabelli/http-language-server/issues) or [Pull Request](https://github.com/mateusabelli/http-language-server/pulls) if you encounter any problems or have suggestions for improvement.

For more information on the project and how to get started, please see the main [README](../README.md) at the root of the project.

## Troubleshooting

If you encounter any issues while using the HTTP Language Server Extension, please check the following:

- Ensure that you have installed all of the required dependencies and have set up your environment correctly.
- Check the documentation and issue tracker for common problems and their solutions.
- If you are still having trouble, please create an issue with a detailed description of the problem and steps to reproduce it.

## License

HTTP Language Server is licensed under the terms of the **MIT** license. See [LICENSE.md](./LICENSE.md)