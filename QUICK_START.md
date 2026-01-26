# Quick Start Guide

## For Users

### VSCode Users

1. Open VSCode
2. Go to Extensions (Cmd+Shift+X / Ctrl+Shift+X)
3. Search for "Wye"
4. Click Install
5. Select theme: Cmd+K Cmd+T / Ctrl+K Ctrl+T

### Zed Users

1. Open Zed
2. Press Cmd+Shift+P / Ctrl+Shift+P
3. Type "zed: extensions"
4. Search for "Wye"
5. Click Install
6. Select theme: Cmd+Shift+P → "theme selector: toggle"

## For Developers

### Setup

```bash
git clone https://github.com/phyzess/vscode-theme-wye.git
cd vscode-theme-wye
pnpm install
```

### Build Themes

```bash
# Build VSCode themes
pnpm run build

# Build Zed themes
pnpm run build:zed

# Build both
pnpm run build:all
```

### Development

```bash
# Watch mode for VSCode themes
pnpm run dev
```

### Test Locally

**VSCode:**
1. Press F5 in VSCode to open Extension Development Host
2. Select theme in the new window

**Zed:**
1. Copy theme file:
   ```bash
   cp themes/wye.json ~/.config/zed/themes/
   ```
2. Restart Zed
3. Select theme

Or install as dev extension:
1. Open Zed
2. Press Cmd+Shift+P → "zed: install dev extension"
3. Select this repository directory

### Publish

**VSCode:**
```bash
pnpm run release
```

**Zed:**
See [PUBLISHING.md](./PUBLISHING.md) for detailed instructions.

## Common Tasks

### Add a New Color

1. Edit `src/colors.ts`
2. Update `src/theme.ts` (VSCode)
3. Update `src/zed-theme.ts` (Zed)
4. Run `pnpm run build:all`

### Update Version

1. Update `package.json`
2. Update `extensions/zed/extension.toml`
3. Update `CHANGELOG.md`
4. Run `pnpm run build:all`
5. Commit and tag

### Create New Variant

1. Add variant logic in `src/theme.ts` and `src/zed-theme.ts`
2. Update build scripts (`src/index.ts` and `src/zed-index.ts`)
3. Update `package.json` contributes section (VSCode)
4. Run `pnpm run build:all`

## Documentation

- [README.md](./README.md) - Main documentation
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Project architecture
- [PUBLISHING.md](./PUBLISHING.md) - Publishing guide
- [extensions/zed/README.md](./extensions/zed/README.md) - Zed-specific docs

## Support

- GitHub Issues: https://github.com/phyzess/vscode-theme-wye/issues
- VSCode Marketplace: https://marketplace.visualstudio.com/items?itemName=phyzess.wye

