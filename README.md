# HTTP Language Server

> **Warning**
> This is a work in progress.

## Summary 

The **HTTP Language Server** is a [LSP](https://microsoft.github.io/language-server-protocol/) that helps you while writing your HTTP codes and messages. At the moment it only supports hover documentation on all official status codes, but there are many features planned to be released soon.

In this early stages, breaking changes will occur frequently, so it's important that if want to use this server and it's extension, to use it with caution and please report any bugs that you might encounter. 

## Development

[Issues](https://github.com/mateusabelli/http-language-server/issues) and [Pull Requests](https://github.com/mateusabelli/http-language-server/pulls) are welcome!

**Project setup**

```sh
git clone https://github.com/mateusabelli/http-language-server.git

cd http-language-server

pnpm install
```
### How to...

#### Use the monorepo

```sh
pnpm run server <cmd>
pnpm run client <cmd>

# example
pnpm run server install typescript
```

#### Run it in Visual Studio Code

After having the dependencies installed you can simply click on the **Run and Debug** menu located in your side bar. Select **Launch Client** and click **Start Debugging** or press **F5**.

> **Note**
> For simplicity of the development, the extension attach the server only to `plaintext` file formats by default.

**Add more file formats**
```javascript
// packages/client/extension.js
const clientOptions = {
  documentSelector: [
    { scheme: "file", language: "plaintext" },
    { scheme: "file", language: "javascript" }, // <-- Add here 
  ],
};

// packages/client/package.json
{
  "activationEvents": [
    "onLanguage:plaintext",
    "onLanguage:javascript" // <-- Add here
  ],
}
```

#### Run it in Neovim

After having the dependencies installed you will need to have a working LSP setup in Neovim using [lspconfig](https://github.com/neovim/nvim-lspconfig). Then you will to follow lspconfig's [Contributing](https://github.com/neovim/nvim-lspconfig#contributions) guide to manually add this server configuration.

Here is the config file
`lua/lspconfig/server_configurations/http-language-server.lua`

```lua
local util = require 'lspconfig.util'

local bin_name = 'http-language-server'
local cmd = { bin_name, '--stdio' }

if vim.fn.has 'win32' == 1 then
  cmd = { 'cmd.exe', '/C', bin_name, '--stdio' }
end

return {
  default_config = {
    cmd = cmd,
    filetypes = { 'text' },
    root_dir = util.find_git_ancestor,
    single_file_support = true,
  },
}
```

Then you can activate this server in the lua file that you use to setup all the other servers.

```lua
require('lspconfig')['http_language_server'].setup({
  capabilities = capabilities,
  on_attach = on_attach
})
```

## References

- https://www.iana.org/
- https://developer.mozilla.org/en-US/docs/Web/HTTP
- https://github.com/grahambates/m68k-lsp
- https://github.com/aca/emmet-ls

## License

HTTP Language Server is licensed under the terms of the MIT license.

See [LICENSE.md](./LICENSE.md)