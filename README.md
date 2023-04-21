# HTTP Language Server

> **Warning**
> This project is under development.

The **HTTP Language Server** is a [LSP](https://microsoft.github.io/language-server-protocol/) implementation for HTTP. It helps you to easily write your HTTP messages and requests by leveraging features like completion, hover documentation and diagnostics.

In the early stages, **breaking changes** can occur frequently, so it's important that if want to use this server, to use it with caution and please report any bugs that you might encounter.

## Development

Contributions are welcome! Please create an [Issue](https://github.com/mateusabelli/http-language-server/issues) or [Pull Request](https://github.com/mateusabelli/http-language-server/pulls) if you encounter any problems or have suggestions for improvement.

### Project Setup

  ```sh
  # Clone the repository
  git clone https://github.com/mateusabelli/http-language-server.git

  # Navigate to the project folder
  cd http-language-server
  ```

### Server Setup

  ```sh
  # Navigate to the server folder
  cd server/

  # Create a new virtual environment
  python -m venv venv

  # Activate the environment
  source venv/bin/activate

  # Install the required dependencies
  python -m pip install -r requirements.txt
  ```

Create `.vscode/settings.json` file and set `python.interpreterPath` to point to your python environment where `pygls` is installed.

```json
{
    "python.defaultInterpreterPath": "${workspaceFolder}/server/venv/bin/python"
}
```

-  Switch to the **Run and Debug** View in the Sidebar (Ctrl+Shift+D).
-  Select `Launch Server` from the drop down.
- Press **▷** to run the launch config (F5).

### Client Setup

#### VSCode

  ```sh
  # Navigate to the client folder
  cd client/

  # Install the required dependencies
  npm install
  ```

-  Switch to the **Run and Debug** View in the Sidebar (Ctrl+Shift+D).
-  Select `Launch Client` from the drop down.
- Press **▷** to run the launch config (F5).

#### Other Editors

> **Note**
> Not tested, feedback is welcome!

These setup configurations won't work until a standalone executable is compiled from the server, but you can still use them if you know how to set it up to run from the server source code.

<details>
<summary>Neovim (without `lspconfig`)</summary>

  ```lua
  vim.api.nvim_create_autocmd({ "BufEnter" }, {
    pattern = { ".http" },
    callback = function()
      vim.lsp.start({
        name = "http-language-server",
        cmd = { "http-language-server --stdio" },
        root_dir = vim.fs.dirname(vim.fs.find({ ".git" }, { upward = true })[1])
      })
    end,
  })
  ```

</details>

<details>
<summary>Neovim (with `lspconfig`)</summary>

After having the dependencies installed you will need to have a working LSP setup in Neovim using [lspconfig](https://github.com/neovim/nvim-lspconfig). Then you will need to follow lspconfig's [Contributing](https://github.com/neovim/nvim-lspconfig#contributions) guide to manually add this server configuration.

The config file: `lua/lspconfig/server_configurations/http-language-server.lua`

  ```lua
  -- http-language-server.lua
  local util = require 'lspconfig.util'

  local bin_name = 'http-language-server'
  local cmd = { bin_name, '--stdio' }

  if vim.fn.has 'win32' == 1 then
    cmd = { 'cmd.exe', '/C', bin_name, '--stdio' }
  end

  return {
    default_config = {
      cmd = cmd,
      filetypes = { '.http' },
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

</details>

<details>
<summary>Vim (`vim-lsp`)</summary>

  ```vim
  augroup HelloWorldPythonExample
  au!
  autocmd User lsp_setup call lsp#register_server({
      \ 'name': 'http-language-server',
      \ 'cmd': {server_info->['http-language-server', '--stdio']},
      \ 'allowlist': ['.http']
      \ })
  augroup END
  ```
</details>

<details>
<summary>Emacs (`lsp-mode`)</summary>

  ```lisp
  (make-lsp-client :new-connection
  (lsp-stdio-connection
    `(,(executable-find "http-language-server") "--stdio"))
    :activation-fn (lsp-activate-on ".http")
    :server-id 'http-language-server')
  ```

</details>

<details>
<summary>Sublime</summary>

  ```json
  {
      "clients": {
        "http-language-server": {
          "command": ["http-language-server", "--stdio"],
          "enabled": true,
          "selector": "source.http"
        }
      }
    }
  ```

</details>

## Structure

```javascript
.
├─ client // Language Client
│  ├─ src
│  │  └─ extension.ts // Language Client entry point
│  └─ syntax // Syntax hightlighting settings
│
└─ server // Language Server
   ├─ __main__.py // Language Server entry point
   └─ server.py
```

## References

- https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-sample
- https://github.com/openlawlibrary/pygls/tree/master/examples
- https://github.com/regen100/cmake-language-server
- https://www.iana.org/
- https://developer.mozilla.org/en-US/docs/Web/HTTP
- https://github.com/grahambates/m68k-lsp
- https://github.com/aca/emmet-ls

## Troubleshooting

If you encounter any issues while using the HTTP Language Server, please check the following:

- Ensure that you have installed all of the required dependencies and have set up your environment correctly.
- Check the documentation and issue tracker for common problems and their solutions.
- If you are still having trouble, please create an issue with a detailed description of the problem and steps to reproduce it.

## License

HTTP Language Server is licensed under the terms of the **MIT** license. See [LICENSE.md](./LICENSE.md)