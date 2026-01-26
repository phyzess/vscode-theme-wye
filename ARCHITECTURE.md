# Wye Theme - Architecture

This document explains the architecture of the Wye theme project, which supports both VSCode and Zed editors from a single codebase.

## Design Philosophy

**Single Source, Multiple Targets**: The project maintains one source of truth for colors and theme definitions, then generates platform-specific theme files for both VSCode and Zed.

## Directory Structure

```
vscode-theme-wye/
├── src/                          # Source code (shared between platforms)
│   ├── colors.ts                # Color palette definitions
│   ├── primer.ts                # Primer color system
│   ├── utils.ts                 # Utility functions
│   ├── theme.ts                 # VSCode theme generator
│   ├── index.ts                 # VSCode build script
│   ├── zed-theme.ts             # Zed theme generator
│   └── zed-index.ts             # Zed build script
│
├── vscode-themes/                # Generated VSCode themes (5 files)
│   ├── wye-light.json
│   ├── wye-dark.json
│   ├── wye-black.json
│   ├── wye-light-soft.json
│   └── wye-dark-soft.json
│
├── themes/                       # Generated Zed themes (at root for Zed)
│   └── wye.json                 # All 5 Zed theme variants in one file
│
├── extension.toml                # Zed extension metadata (at root)
├── package.json                  # VSCode extension metadata & scripts
├── .vscodeignore                # VSCode publish exclusions
├── README.md                     # Main documentation
├── PUBLISHING.md                 # Publishing guide
└── ARCHITECTURE.md               # This file
```

### Why This Structure?

**VSCode**: Packages and uploads extensions to the marketplace. The `.vscodeignore` file excludes Zed-specific files (`extension.toml`, `themes/`).

**Zed**: Uses a **submodule-based publishing system**. The entire repository is added as a git submodule to `zed-industries/extensions`. Zed expects:
- `extension.toml` at the root
- Theme files in `themes/` directory at the root

This structure allows both platforms to coexist in the same repository while maintaining their respective conventions.

## Color System

### Color Definitions (`src/colors.ts`)

Colors are defined in a dual-mode format:

```typescript
export const WyeThemes = {
  primary: ["#BDE46F", "#1c6b48"],  // [dark mode, light mode]
  foreground: ["#e5e5e5", "#393a34"],
  // ...
}
```

This allows both light and dark themes to share the same color definitions while using appropriate values for each mode.

### Theme Variants

The project supports 5 theme variants:

1. **Wye Light** - Standard light theme (white background)
2. **Wye Dark** - Standard dark theme (dark gray background)
3. **Wye Black** - Dark theme with pure black background (OLED-friendly)
4. **Wye Light Soft** - Light theme with softer, warmer background
5. **Wye Dark Soft** - Dark theme with reduced contrast

## Build System

### VSCode Build (`src/index.ts`)

Generates 5 separate JSON files in `vscode-themes/` directory:

```bash
pnpm run build
```

Output:
- `vscode-themes/wye-light.json`
- `vscode-themes/wye-dark.json`
- `vscode-themes/wye-black.json`
- `vscode-themes/wye-light-soft.json`
- `vscode-themes/wye-dark-soft.json`

### Zed Build (`src/zed-index.ts`)

Generates a single JSON file containing all 5 variants:

```bash
pnpm run build:zed
```

Output:
- `themes/wye.json` (at root, for Zed extension)

### Combined Build

```bash
pnpm run build:all
```

Runs both VSCode and Zed builds.

## Theme Generation

### VSCode Theme Generator (`src/theme.ts`)

- Uses VSCode's theme format
- Separate `colors` object for UI elements
- `tokenColors` array for syntax highlighting
- Each variant is a standalone JSON file

### Zed Theme Generator (`src/zed-theme.ts`)

- Uses Zed's Theme Family format (schema v0.2.0)
- Single file with multiple themes
- Nested `style` object for both UI and syntax
- Maps VSCode concepts to Zed equivalents

### Color Mapping

| Concept | VSCode | Zed |
|---------|--------|-----|
| UI Colors | `colors` object | `style.*` properties |
| Syntax | `tokenColors` array | `style.syntax.*` object |
| Terminal | `terminal.ansi*` | `terminal.ansi.*` |
| Git Status | `gitDecoration.*` | `created`, `modified`, etc. |

## Publishing

### VSCode Publishing

**Target**: [Visual Studio Marketplace](https://marketplace.visualstudio.com/)

**What's included** (controlled by `.vscodeignore`):
- `themes/` directory
- `README.md`, `CHANGELOG.md`, `LICENSE`
- `icon.jpg`
- `package.json`

**What's excluded**:
- `src/` (source code)
- `extension.toml` (Zed extension config)
- `themes/` (Zed theme files)
- `node_modules/`
- Build configuration files
- Documentation files (except README, CHANGELOG, LICENSE)

**Command**: `pnpm run release`

### Zed Publishing

**Target**: [Zed Extensions Repository](https://github.com/zed-industries/extensions)

**Method**: Git submodule (entire repository)

**What Zed uses**:
- `extension.toml` (at root)
- `themes/wye.json` (at root)

**What Zed ignores**:
- `vscode-themes/` (VSCode-specific)
- `src/` (source code)
- `package.json` (VSCode-specific)

**Process**:
1. Add this repository as a submodule to `zed-industries/extensions`
2. Update `extensions.toml` with version info
3. Submit PR to zed-industries/extensions repository

See [PUBLISHING.md](./PUBLISHING.md) for detailed instructions.

## Development Workflow

### Adding a New Color

1. Update `src/colors.ts` with the new color
2. Update `src/theme.ts` to use the color in VSCode theme
3. Update `src/zed-theme.ts` to use the color in Zed theme
4. Run `pnpm run build:all`
5. Test in both editors

### Modifying Theme Logic

1. Edit `src/theme.ts` (for VSCode) or `src/zed-theme.ts` (for Zed)
2. Run the appropriate build command
3. Test the changes
4. Commit both source and generated files

### Version Update

1. Update version in `package.json`
2. Update version in `extension.toml` (at root)
3. Update `CHANGELOG.md`
4. Run `pnpm run build:all`
5. Commit and tag: `git tag v0.7.1`
6. Push with tags: `git push --tags`
7. Publish to VSCode Marketplace: `pnpm run release`
8. Update submodule in zed-industries/extensions and create PR

## Benefits of This Architecture

1. **Single Source of Truth**: Colors defined once, used everywhere
2. **Consistency**: Both editors get the same visual experience
3. **Maintainability**: Changes propagate to both platforms automatically
4. **Independence**: Each platform can be published separately
5. **Flexibility**: Platform-specific customizations are possible
6. **Type Safety**: TypeScript ensures correctness during build

## Future Enhancements

Potential improvements:

- Add more theme variants (e.g., high contrast)
- Support for other editors (Sublime Text, Vim, etc.)
- Automated testing for color contrast ratios
- CI/CD pipeline for automated publishing
- Theme preview generator

