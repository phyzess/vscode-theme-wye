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
- ✅ `themes/` directory (VSCode theme files)
- ✅ `README.md`
- ✅ `CHANGELOG.md`
- ✅ `LICENSE`
- ✅ `icon.jpg`
- ❌ `src/` (source code)
- ❌ `extensions/` (Zed extension)
- ❌ `node_modules/`
- ❌ Build configuration files

## Publishing to Zed Extensions

Zed extensions are published through the [zed-industries/extensions](https://github.com/zed-industries/extensions) repository.

### First-time Setup

1. Fork the [zed-industries/extensions](https://github.com/zed-industries/extensions) repository

2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/extensions.git zed-extensions
   cd zed-extensions
   ```

### Publishing Process

1. Update version in `extensions/zed/extension.toml`

2. Build the Zed themes:
   ```bash
   cd /path/to/vscode-theme-wye
   pnpm run build:zed
   ```

3. Copy the extension to the Zed extensions repository:
   ```bash
   # In the zed-extensions repository
   mkdir -p extensions/wye
   cp -r /path/to/vscode-theme-wye/extensions/zed/* extensions/wye/
   ```

4. Test locally:
   ```bash
   # In the zed-extensions repository
   cargo run --release
   ```

5. Commit and push:
   ```bash
   git add extensions/wye
   git commit -m "Add Wye theme v0.7.1"
   git push origin main
   ```

6. Create a Pull Request to [zed-industries/extensions](https://github.com/zed-industries/extensions)

### What Gets Published

The `extensions/zed/` directory contains:
- ✅ `extension.toml` (Zed extension metadata)
- ✅ `README.md` (Zed-specific documentation)
- ✅ `themes/wye.json` (all 5 theme variants)

## Version Management

Keep versions synchronized between:
- `package.json` (VSCode)
- `extensions/zed/extension.toml` (Zed)

### Recommended Workflow

1. Update version in both files
2. Update `CHANGELOG.md`
3. Build both themes: `pnpm run build:all`
4. Commit changes
5. Create a git tag: `git tag v0.7.1`
6. Push with tags: `git push --tags`
7. Publish to VSCode Marketplace
8. Publish to Zed Extensions

## Troubleshooting

### VSCode Publishing Issues

- **Authentication failed**: Re-run `pnpm dlx vsce login`
- **Package too large**: Check `.vscodeignore` to exclude unnecessary files
- **Missing files**: Ensure `package.json` "files" field includes "themes"

### Zed Publishing Issues

- **Theme not loading**: Validate JSON with `jq . extensions/zed/themes/wye.json`
- **Schema errors**: Check against [Zed theme schema](https://zed.dev/schema/themes/v0.2.0.json)
- **PR rejected**: Follow Zed's contribution guidelines

## Resources

- [VSCode Extension Publishing](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Zed Extension Development](https://zed.dev/docs/extensions)
- [Zed Theme Schema](https://zed.dev/schema/themes/v0.2.0.json)

