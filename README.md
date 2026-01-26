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

Or see the [Zed extension README](./extensions/zed/README.md) for more details.

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
├── themes/                   # Generated VSCode themes
│   ├── wye-light.json
│   ├── wye-dark.json
│   ├── wye-black.json
│   ├── wye-light-soft.json
│   └── wye-dark-soft.json
├── extensions/zed/           # Zed extension (for publishing)
│   ├── extension.toml       # Zed extension config
│   ├── README.md            # Zed-specific README
│   └── themes/
│       └── wye.json         # All 5 Zed theme variants
└── zed-themes/              # Generated Zed themes (reference)
    └── wye.json
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

The Zed extension is located in `extensions/zed/` directory. To publish:

1. Fork the [zed-industries/extensions](https://github.com/zed-industries/extensions) repository
2. Add this repository as a submodule in the `extensions/` directory
3. Update the `extensions.toml` file
4. Submit a pull request

See the [Zed extension README](./extensions/zed/README.md) for detailed instructions.

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Quick start guide for users and developers
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Project architecture and design philosophy
- **[PUBLISHING.md](./PUBLISHING.md)** - How to publish to VSCode Marketplace and Zed Extensions
- **[extensions/zed/README.md](./extensions/zed/README.md)** - Zed extension documentation
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and changes

## 🙏 Credits

Based on [GitHub Theme](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme) and customized for personal preference.

## 📄 License

MIT