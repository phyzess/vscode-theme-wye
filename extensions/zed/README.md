# Wye Theme for Zed

A soothing color scheme for Zed editor, based on the popular [GitHub Theme](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme).

## 🎨 Theme Variants

This extension includes 5 carefully crafted theme variants:

- **Wye Light** - Clean light theme with white background
- **Wye Dark** - Dark theme with balanced contrast
- **Wye Black** - Pure black background for OLED displays
- **Wye Light Soft** - Light theme with softer, warmer background
- **Wye Dark Soft** - Dark theme with softer contrast

## 📦 Installation

### From Zed Extensions (Recommended)

1. Open Zed
2. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Linux/Windows)
3. Type "zed: extensions"
4. Search for "Wye"
5. Click Install

### Manual Installation

1. Download the latest release
2. Copy the theme file to your Zed themes directory:
   - **macOS/Linux**: `~/.config/zed/themes/wye.json`
   - **Windows**: `%APPDATA%\Zed\themes\wye.json`
3. Restart Zed

## 🎯 Usage

1. Open Zed
2. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Linux/Windows)
3. Type "theme selector: toggle"
4. Select one of the Wye themes

## ✨ Features

- **Complete Syntax Highlighting**: 38+ syntax elements for comprehensive code highlighting
- **UI Consistency**: Carefully designed UI colors for a cohesive experience
- **Terminal Support**: Full ANSI color support including bright variants
- **Git Integration**: Distinct colors for different Git states
- **Editor Enhancements**: Line numbers, indent guides, and document highlights
- **Responsive Design**: Proper colors for hover, active, and selected states

## 🔗 Related

- [Wye Theme for VSCode](https://marketplace.visualstudio.com/items?itemName=phyzess.wye)
- [GitHub Repository](https://github.com/phyzess/vscode-theme-wye)

## 🛠️ Development

This Zed extension is generated from the same source code as the VSCode theme. To contribute or build from source:

1. Clone the repository:
   ```bash
   git clone https://github.com/phyzess/vscode-theme-wye.git
   cd vscode-theme-wye
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Build the Zed theme:
   ```bash
   pnpm run build:zed
   ```

4. The generated theme will be in `extensions/zed/themes/wye.json`

## 📝 License

MIT License - See [LICENSE](https://github.com/phyzess/vscode-theme-wye/blob/main/LICENSE) for details

## 🙏 Credits

Based on [GitHub Theme](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme) and customized for personal preference.

