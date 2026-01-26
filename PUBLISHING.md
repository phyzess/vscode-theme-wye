# Publishing Guide

This document describes how to publish the Wye theme to both VSCode Marketplace and Zed Extensions.

## Prerequisites

- Node.js and pnpm installed
- Git repository access
- VSCode Marketplace publisher account (for VSCode)
- GitHub account (for Zed)

## Publishing to VSCode Marketplace

### First-time Setup

1. Install vsce (VSCode Extension Manager):
   ```bash
   pnpm add -D @vscode/vsce
   ```

2. Create a publisher account at [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage)

3. Get a Personal Access Token from [Azure DevOps](https://dev.azure.com/)

4. Login with vsce:
   ```bash
   pnpm dlx vsce login <publisher-name>
   ```

### Publishing Process

1. Update version in `package.json`

2. Update `CHANGELOG.md` with changes

3. Build the themes:
   ```bash
   pnpm run build
   ```

4. Test the extension locally:
   ```bash
   pnpm dlx vsce package
   # This creates a .vsix file you can install in VSCode for testing
   ```

5. Publish:
   ```bash
   pnpm run release
   ```
   
   Or manually:
   ```bash
   pnpm dlx vsce publish
   ```

### What Gets Published

The `.vscodeignore` file controls what's included:
- ✅ `vscode-themes/` directory (VSCode theme files)
- ✅ `README.md`
- ✅ `CHANGELOG.md`
- ✅ `LICENSE`
- ✅ `icon.jpg`
- ❌ `src/` (source code)
- ❌ `extension.toml` (Zed extension config)
- ❌ `themes/` (Zed theme files)
- ❌ `node_modules/`
- ❌ Build configuration files

## Publishing to Zed Extensions

Zed extensions are published through the [zed-industries/extensions](https://github.com/zed-industries/extensions) repository using **git submodules**.

### Important: Zed's Submodule-Based Publishing

Unlike VSCode, Zed extensions are **not packaged and uploaded**. Instead:
- Your entire repository is added as a **git submodule** to `zed-industries/extensions`
- The root of your repository must contain `extension.toml`
- Themes must be in the `themes/` directory at the root
- Zed will build and serve your extension directly from your repository

### First-time Setup

1. Ensure your repository has a valid license (required by Zed):
   - Accepted licenses: Apache 2.0, BSD 3-Clause, GNU GPLv3, GNU LGPLv3, MIT, zlib
   - License file must be at the root of your repository

2. Fork the [zed-industries/extensions](https://github.com/zed-industries/extensions) repository to your **personal GitHub account** (not an organization)
   - This allows Zed staff to push changes to your PR if needed

3. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/extensions.git zed-extensions
   cd zed-extensions
   git submodule init
   git submodule update
   ```

### Publishing Process

1. Update version in `extension.toml` (at the root of vscode-theme-wye)

2. Build the Zed themes:
   ```bash
   cd /path/to/vscode-theme-wye
   pnpm run build:zed
   ```

3. Commit and push your theme repository:
   ```bash
   git add themes/wye.json extension.toml
   git commit -m "Release v0.7.1"
   git push origin main
   ```

4. Add your repository as a submodule to zed-extensions:
   ```bash
   cd /path/to/zed-extensions

   # Add your repo as a submodule (use HTTPS URL, not SSH)
   git submodule add https://github.com/phyzess/vscode-theme-wye.git extensions/wye
   git add extensions/wye
   ```

5. Update `extensions.toml` in the zed-extensions repository:
   ```bash
   # Add this entry to extensions.toml (keep alphabetical order)
   [wye]
   submodule = "extensions/wye"
   version = "0.7.1"
   ```

6. Sort the extensions file:
   ```bash
   pnpm sort-extensions
   ```

7. Commit and push:
   ```bash
   git add extensions.toml .gitmodules
   git commit -m "Add Wye theme v0.7.1"
   git push origin main
   ```

8. Create a Pull Request to [zed-industries/extensions](https://github.com/zed-industries/extensions)

### Updating an Existing Extension

1. Update your theme repository with new changes and push

2. In the zed-extensions repository:
   ```bash
   cd /path/to/zed-extensions

   # Update the submodule to the latest commit
   git submodule update --remote extensions/wye

   # Update the version in extensions.toml
   # Change version = "0.7.1" to version = "0.7.2"

   # Commit and push
   git add extensions/wye extensions.toml
   git commit -m "Update Wye theme to v0.7.2"
   git push origin main
   ```

3. Create a Pull Request

### What Gets Published

The entire repository is published as a submodule, but Zed only uses:
- ✅ `extension.toml` (at root - Zed extension metadata)
- ✅ `themes/wye.json` (at root - all 5 theme variants)
- ❌ `vscode-themes/` (ignored by Zed)
- ❌ `src/` (source code - not needed at runtime)

## Version Management

Keep versions synchronized between:
- `package.json` (VSCode)
- `extension.toml` (Zed - at root)

### Recommended Workflow

1. Update version in both `package.json` and `extension.toml`
2. Update `CHANGELOG.md`
3. Build both themes: `pnpm run build:all`
4. Commit changes to your repository
5. Create a git tag: `git tag v0.7.1`
6. Push with tags: `git push --tags`
7. Publish to VSCode Marketplace (using `pnpm run release`)
8. Update the submodule in zed-industries/extensions and create a PR

## Troubleshooting

### VSCode Publishing Issues

- **Authentication failed**: Re-run `pnpm dlx vsce login`
- **Package too large**: Check `.vscodeignore` to exclude unnecessary files
- **Missing files**: Ensure `package.json` "files" field includes "themes"

### Zed Publishing Issues

- **Theme not loading**: Validate JSON with `jq . themes/wye.json`
- **Schema errors**: Check against [Zed theme schema](https://zed.dev/schema/themes/v0.2.0.json)
- **Submodule URL must be HTTPS**: Use `https://github.com/...` not `git@github.com:...`
- **License validation failed**: Ensure you have a valid license file at the root
- **PR rejected**: Follow Zed's contribution guidelines and ensure `pnpm sort-extensions` was run

## Resources

- [VSCode Extension Publishing](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Zed Extension Development](https://zed.dev/docs/extensions)
- [Zed Theme Schema](https://zed.dev/schema/themes/v0.2.0.json)

