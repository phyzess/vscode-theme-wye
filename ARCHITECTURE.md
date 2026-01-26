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
├── themes/                       # Generated VSCode themes (5 files)
│   ├── wye-light.json
│   ├── wye-dark.json
│   ├── wye-black.json
│   ├── wye-light-soft.json
│   └── wye-dark-soft.json
│
├── extensions/zed/               # Zed extension (for publishing)
│   ├── extension.toml           # Zed extension metadata
│   ├── README.md                # Zed-specific documentation
│   └── themes/
│       └── wye.json             # All 5 Zed theme variants in one file
│
├── zed-themes/                   # Generated Zed themes (reference copy)
│   └── wye.json
│
├── package.json                  # VSCode extension metadata & scripts
├── .vscodeignore                # VSCode publish exclusions
├── README.md                     # Main documentation
├── PUBLISHING.md                 # Publishing guide
└── ARCHITECTURE.md               # This file
```

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

Generates 5 separate JSON files in `themes/` directory:

```bash
pnpm run build
```

Output:
- `themes/wye-light.json`
- `themes/wye-dark.json`
- `themes/wye-black.json`
- `themes/wye-light-soft.json`
- `themes/wye-dark-soft.json`

### Zed Build (`src/zed-index.ts`)

Generates a single JSON file containing all 5 variants:

```bash
pnpm run build:zed
```

Output:
- `zed-themes/wye.json` (reference)
- `extensions/zed/themes/wye.json` (for publishing)

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
- `extensions/` (Zed extension)
- `node_modules/`
- Build configuration files

**Command**: `pnpm run release`

### Zed Publishing

**Target**: [Zed Extensions Repository](https://github.com/zed-industries/extensions)

**What's included**:
- `extensions/zed/extension.toml`
- `extensions/zed/README.md`
- `extensions/zed/themes/wye.json`

**Process**: Submit PR to zed-industries/extensions repository

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
2. Update version in `extensions/zed/extension.toml`
3. Update `CHANGELOG.md`
4. Run `pnpm run build:all`
5. Commit and tag: `git tag v0.7.1`
6. Publish to both platforms

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

