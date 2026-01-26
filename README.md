# Wye Theme

A soothing color scheme for **VSCode** and **Zed** editors, based on [GitHub Theme](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme).

## 🎨 Theme Variants

- **Wye Light** - Clean light theme with white background
- **Wye Dark** - Dark theme with balanced contrast
- **Wye Black** - Pure black background for OLED displays
- **Wye Light Soft** - Light theme with softer, warmer background
- **Wye Dark Soft** - Dark theme with softer contrast

## 📦 Installation

### For VSCode Users

Install from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=phyzess.wye) or search for "Wye" in VSCode's extension marketplace.

### For Zed Users

1. Open Zed
2. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Linux/Windows)
3. Type "zed: extensions"
4. Search for "Wye"
5. Click Install

## 🛠️ Development

This repository supports both VSCode and Zed theme generation from a single source.

### Setup

```bash
# Install dependencies
pnpm install
```

### Build Commands

```bash
# Build VSCode themes only
pnpm run build

# Build Zed themes only
pnpm run build:zed

# Build both VSCode and Zed themes
pnpm run build:all

# Watch mode for VSCode themes (development)
pnpm run dev
```

### Project Structure

```
vscode-theme-wye/
├── src/                      # Source code (shared)
│   ├── colors.ts            # Color palette definitions
│   ├── primer.ts            # Primer color system
│   ├── utils.ts             # Utility functions
│   ├── theme.ts             # VSCode theme generator
│   ├── index.ts             # VSCode build script
│   ├── zed-theme.ts         # Zed theme generator
│   └── zed-index.ts         # Zed build script
├── vscode-themes/            # Generated VSCode themes
│   ├── wye-light.json
│   ├── wye-dark.json
│   ├── wye-black.json
│   ├── wye-light-soft.json
│   └── wye-dark-soft.json
├── themes/                   # Generated Zed themes
│   └── wye.json             # All 5 Zed theme variants
├── extension.toml           # Zed extension config (at root)
└── package.json             # VSCode extension config
```

## 📦 Publishing

### Publishing to VSCode Marketplace

```bash
# Build VSCode themes
pnpm run build

# Publish (requires vsce authentication)
pnpm run release
```

The `.vscodeignore` file ensures only necessary files are included in the VSCode package.

### Publishing to Zed Extensions

Zed uses a **submodule-based publishing system**. To publish:

1. Build Zed themes: `pnpm run build:zed`
2. Commit and push your changes
3. Fork the [zed-industries/extensions](https://github.com/zed-industries/extensions) repository
4. Add this entire repository as a submodule: `git submodule add https://github.com/phyzess/vscode-theme-wye.git extensions/wye`
5. Update the `extensions.toml` file with version info
6. Submit a pull request

See **[PUBLISHING.md](./PUBLISHING.md)** for detailed step-by-step instructions.

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Quick start guide for users and developers
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Project architecture and design philosophy
- **[PUBLISHING.md](./PUBLISHING.md)** - Detailed publishing guide for both VSCode and Zed
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and changes

## 🙏 Credits

Based on [GitHub Theme](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme) and customized for personal preference.

## 📄 License

MIT