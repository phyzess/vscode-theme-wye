import { WyeThemes } from './colors'
import { getColors } from './primer'
import { toArray } from './utils'

export default function getTheme({ style, name, soft = false, black = false }) {
  // Usage: `pick({ light: "lightblue", dark: "darkblue" })`
  const pick = (options) => options[style]

  const wye = (key: keyof typeof WyeThemes, op = '') => pick({ light: WyeThemes[key][1] + op, dark: WyeThemes[key][0] + op })

  const primer = getColors(style)

  const foreground = wye('foreground')
  const secondaryForeground = wye('secondaryForeground')
  const activeForeground = wye('activeForeground')
  const primary = wye('primary')

  const border = soft ? wye('lowBorder') : wye('border')
  const background = black ? '#000' : soft ? wye('lowBackground') : wye('background')
  const activeBackground = black ? '#050505' : soft ? wye('lowActiveBackground') : wye('activeBackground')

  const selectionBackgroundInActive = pick({ light: '#22222208', dark: '#2f3e46' })
  const selectionBackgroundActive = pick({ light: '#22222215', dark: '#52796f' })
  const selectionBackground = pick({ light: '#22222215', dark: '#252f34' })

  const theme = {
    name,
    base: pick({ light: 'vs', dark: 'vs-dark' }),
    colors: {
      focusBorder: wye('pink'),
      foreground,
      descriptionForeground: secondaryForeground,
      errorForeground: wye('red'),

      'textLink.foreground': primary,
      'textLink.activeForeground': primary,
      'textBlockQuote.background': background,
      'textBlockQuote.border': border,
      'textCodeBlock.background': background,
      'textPreformat.foreground': primer.gray[6],
      'textSeparator.foreground': primer.gray[3],

      'button.background': primary,
      'button.foreground': background,
      'button.hoverBackground': primary,

      'checkbox.background': activeBackground,
      'checkbox.border': pick({ light: primer.gray[3], dark: primer.gray[1] }),

      'dropdown.background': background,
      'dropdown.border': border,
      'dropdown.foreground': foreground,
      'dropdown.listBackground': activeBackground,

      'input.background': activeBackground,
      'input.border': border,
      'input.foreground': foreground,
      'input.placeholderForeground': secondaryForeground,
      'inputOption.activeBackground': wye('ignored'),

      'badge.foreground': background,
      'badge.background': secondaryForeground,

      'progressBar.background': primary,

      'titleBar.activeForeground': activeForeground,
      'titleBar.activeBackground': background,
      'titleBar.inactiveForeground': primer.gray[5],
      'titleBar.inactiveBackground': background,
      'titleBar.border': activeBackground,

      'activityBar.foreground': foreground,
      'activityBar.inactiveForeground': secondaryForeground,
      'activityBar.background': background,
      'activityBarBadge.foreground': background,
      'activityBarBadge.background': wye('cyan'),
      'activityBar.activeBorder': primary,
      'activityBar.border': border,

      'sideBar.foreground': activeForeground,
      'sideBar.background': background,
      'sideBar.border': border,
      'sideBarTitle.foreground': foreground,
      'sideBarSectionHeader.foreground': foreground,
      'sideBarSectionHeader.background': background,
      'sideBarSectionHeader.border': border,

      'list.hoverForeground': foreground,
      'list.inactiveSelectionForeground': foreground,
      'list.activeSelectionForeground': foreground,
      'list.hoverBackground': activeBackground,
      'list.inactiveSelectionBackground': black ? '#00B4D830' : pick({ light: '#1c6b4830', dark: '#00B4D830' }),
      'list.activeSelectionBackground': black ? '#00B4D840' : pick({ light: '#1c6b4840', dark: '#00B4D840' }),
      'list.inactiveFocusBackground': background,
      'list.focusBackground': black ? '#00B4D850' : pick({ light: '#1c6b4850', dark: '#00B4D850' }),
      'list.focusForeground': primary,

      'tree.indentGuidesStroke': pick({ light: primer.gray[2], dark: primer.gray[1] }),

      'notificationCenterHeader.foreground': primer.gray[5],
      'notificationCenterHeader.background': background,
      'notifications.foreground': foreground,
      'notifications.background': background,
      'notifications.border': border,
      'notificationsErrorIcon.foreground': wye('red'),
      'notificationsWarningIcon.foreground': wye('orange'),
      'notificationsInfoIcon.foreground': wye('blue'),

      'pickerGroup.border': primer.gray[2],
      'pickerGroup.foreground': foreground,
      'quickInput.background': background,
      'quickInput.foreground': foreground,

      'statusBar.foreground': activeForeground,
      'statusBar.background': background,
      'statusBar.border': border,
      'statusBar.noFolderBackground': background,
      'statusBar.debuggingBackground': activeBackground,
      'statusBar.debuggingForeground': activeForeground,
      'statusBarItem.prominentBackground': activeBackground,

      'editorGroupHeader.tabsBackground': background,
      'editorGroupHeader.tabsBorder': border,
      'editorGroup.border': border,

      'tab.activeForeground': foreground,
      'tab.inactiveForeground': primer.gray[5],
      'tab.inactiveBackground': background,
      'tab.activeBackground': background,
      'tab.hoverBackground': activeBackground,
      'tab.unfocusedHoverBackground': background,
      'tab.border': background,
      'tab.unfocusedActiveBorderTop': border,
      'tab.activeBorder': primary,
      'tab.unfocusedActiveBorder': border,
      'tab.activeBorderTop': background,

      'breadcrumb.foreground': primer.gray[5],
      'breadcrumb.focusForeground': foreground,
      'breadcrumb.background': activeBackground,
      'breadcrumb.activeSelectionForeground': selectionBackgroundActive,
      'breadcrumbPicker.background': background,

      'editor.foreground': foreground,
      'editor.background': background,
      'editorWidget.background': background,
      'editor.foldBackground': pick({ light: '#22222210', dark: '#eeeeee10' }),
      'editor.lineHighlightBackground': activeBackground,
      'editorLineNumber.foreground': wye('ignored'),
      'editorLineNumber.activeForeground': activeForeground,
      'editorIndentGuide.background': pick({ light: '#00000015', dark: '#ffffff15' }),
      'editorIndentGuide.activeBackground': pick({ light: '#00000030', dark: '#ffffff30' }),
      'editorWhitespace.foreground': pick({ light: '#00000015', dark: '#ffffff15' }),
      'editorCursor.foreground': primary,

      'editor.findMatchBackground': pick({ light: '#e6cc7744', dark: '#408494cc' }),
      'editor.findMatchHighlightBackground': pick({ light: '#e6cc7766', dark: '#40849499' }),
      'editor.inactiveSelectionBackground': selectionBackgroundInActive,
      'editor.selectionBackground': selectionBackground,
      'editor.selectionHighlightBackground': selectionBackgroundInActive,
      'editor.wordHighlightBackground': pick({ light: '#1c6b4805', dark: '#1c6b4805' }),
      'editor.wordHighlightStrongBackground': pick({ light: '#1c6b4810', dark: '#1c6b4810' }),
      'editorBracketMatch.background': pick({ light: '#1c6b4820', dark: '#4d937520' }),

      'diffEditor.insertedTextBackground': pick({ light: '#1c6b4815', dark: '#4d937522' }),
      'diffEditor.removedTextBackground': pick({ light: '#ab595910', dark: '#ab595922' }),

      'scrollbar.shadow': pick({ light: '#6a737d33', dark: '#0000' }),
      'scrollbarSlider.background': wye('faded'),
      'scrollbarSlider.hoverBackground': wye('ignored'),
      'scrollbarSlider.activeBackground': wye('ignored'),
      'editorOverviewRuler.border': primer.white,

      'panel.background': background,
      'panel.border': border,
      'panelTitle.activeBorder': primary,
      'panelTitle.activeForeground': foreground,
      'panelTitle.inactiveForeground': primer.gray[5],
      'panelInput.border': pick({ light: primer.gray[2], dark: primer.gray[1] }),

      'terminal.foreground': foreground,
      'terminal.selectionBackground': selectionBackground,
      'terminal.ansiBrightBlack': pick({ light: '#aaaaaa', dark: '#777777' }),
      'terminal.ansiBrightBlue': wye('blue'),
      'terminal.ansiBrightCyan': wye('cyan'),
      'terminal.ansiBrightGreen': wye('green'),
      'terminal.ansiBrightMagenta': wye('magenta'),
      'terminal.ansiBrightRed': wye('red'),
      'terminal.ansiBrightWhite': pick({ light: '#dddddd', dark: '#ffffff' }),
      'terminal.ansiBrightYellow': wye('yellow'),
      'terminal.ansiBlack': pick({ light: WyeThemes.background[0], dark: WyeThemes.foreground[1] }),
      'terminal.ansiBlue': wye('blue'),
      'terminal.ansiCyan': wye('cyan'),
      'terminal.ansiGreen': wye('green'),
      'terminal.ansiMagenta': wye('magenta'),
      'terminal.ansiRed': wye('red'),
      'terminal.ansiWhite': pick({ light: WyeThemes.foreground[0], dark: WyeThemes.foreground[0] }),
      'terminal.ansiYellow': wye('yellow'),

      'gitDecoration.addedResourceForeground': wye('green'),
      'gitDecoration.modifiedResourceForeground': wye('blue'),
      'gitDecoration.deletedResourceForeground': wye('red'),
      'gitDecoration.untrackedResourceForeground': wye('cyan'),
      'gitDecoration.ignoredResourceForeground': wye('ignored'),
      'gitDecoration.conflictingResourceForeground': wye('orange'),
      'gitDecoration.submoduleResourceForeground': wye('secondaryForeground'),

      'editorGutter.modifiedBackground': wye('blue'),
      'editorGutter.addedBackground': wye('green'),
      'editorGutter.deletedBackground': wye('red'),

      'editorBracketHighlight.foreground1': wye('cyan'),
      'editorBracketHighlight.foreground2': wye('green'),
      'editorBracketHighlight.foreground3': wye('orange'),
      'editorBracketHighlight.foreground4': wye('magenta'),
      'editorBracketHighlight.foreground5': wye('yellow'),
      'editorBracketHighlight.foreground6': wye('blue'),

      'debugToolBar.background': background,
      'editor.stackFrameHighlightBackground': pick({ light: primer.yellow[1], dark: '#a707' }),
      'editor.focusedStackFrameHighlightBackground': pick({ light: primer.yellow[2], dark: '#b808' }),

      'peekViewEditor.matchHighlightBackground': pick({ dark: '#ffd33d33' }),
      'peekViewResult.matchHighlightBackground': pick({ dark: '#ffd33d33' }),
      'peekViewEditor.background': background,
      'peekViewResult.background': background,

      'settings.headerForeground': foreground,
      'settings.modifiedItemIndicator': primary,
      'welcomePage.buttonBackground': primer.gray[1],
      'welcomePage.buttonHoverBackground': primer.gray[2],

      'problemsErrorIcon.foreground': wye('red'),
      'problemsWarningIcon.foreground': wye('orange'),
      'problemsInfoIcon.foreground': wye('blue'),

      'editorError.foreground': wye('red'),
      'editorWarning.foreground': wye('orange'),
      'editorInfo.foreground': wye('blue'),
      'editorHint.foreground': wye('green'),

      'editorGutter.commentRangeForeground': wye('ignored'),
      'editorGutter.foldingControlForeground': wye('secondaryForeground'),

      'editorInlayHint.foreground': wye('punctuation'),
      'editorInlayHint.background': '#00000000',

      'editorStickyScroll.background': activeBackground,
      'editorStickyScrollHover.background': activeBackground,
    },
    semanticHighlighting: true,
    semanticTokenColors: {
      namespace: wye('namespace'),
      property: wye('property'),
      interface: wye('interface'),
      type: wye('interface'),
      class: wye('class'),
    },
    tokenColors: [
      {
        scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
        settings: {
          foreground: wye('comment'),
        },
      },
      {
        scope: [
          'delimiter.bracket',
          'delimiter',
          'invalid.illegal.character-not-allowed-here.html',
          'keyword.operator.rest',
          'keyword.operator.spread',
          'keyword.operator.type.annotation',
          'keyword.operator.relational.ts',
          'meta.brace',
          'meta.tag.block.any.html',
          'meta.tag.inline.any.html',
          'meta.tag.structure.input.void.html',
          'meta.type.annotation',
          'storage.type.function.arrow',
          'keyword.operator.type',
          'meta.objectliteral.ts',
          'punctuation',
        ],
        settings: {
          foreground: wye('punctuation'),
        },
      },
      {
        scope: ['constant', 'entity.name.constant', 'variable.language', 'meta.definition.variable'],
        settings: {
          foreground: wye('constant'),
        },
      },
      {
        scope: ['entity', 'entity.name'],
        settings: {
          foreground: wye('function'),
        },
      },
      {
        scope: 'variable.parameter.function',
        settings: {
          foreground,
        },
      },
      {
        scope: ['entity.name.tag', 'tag.html'],
        settings: {
          foreground: wye('keyword'),
        },
      },
      {
        scope: 'entity.name.function',
        settings: {
          foreground: wye('function'),
        },
      },
      {
        scope: ['keyword', 'storage.type.class.jsdoc'],
        settings: {
          foreground: wye('keyword'),
        },
      },
      {
        scope: ['storage', 'storage.type', 'support.type.builtin', 'constant.language.undefined', 'constant.language.null'],
        settings: {
          foreground: wye('builtin'),
        },
      },
      {
        scope: ['storage.modifier.package', 'storage.modifier.import', 'storage.type.java'],
        settings: {
          foreground,
        },
      },
      {
        scope: ['string', 'string punctuation.section.embedded source', 'attribute.value'],
        settings: {
          foreground: wye('string'),
        },
      },
      {
        scope: ['punctuation.definition.string', 'punctuation.support.type.property-name'],
        settings: {
          foreground: wye('string', 'aa'),
        },
      },
      {
        scope: 'support',
        settings: {
          foreground: wye('property'),
        },
      },
      {
        scope: ['property', 'meta.property-name', 'meta.object-literal.key', 'entity.name.tag.yaml', 'attribute.name'],
        settings: {
          foreground: wye('property'),
        },
      },
      {
        scope: ['entity.other.attribute-name', 'invalid.deprecated.entity.other.attribute-name.html'],
        settings: {
          foreground: wye('variable'),
        },
      },
      {
        scope: ['variable', 'identifier'],
        settings: {
          foreground: wye('variable'),
        },
      },
      {
        scope: ['support.type.primitive', 'entity.name.type'],
        settings: {
          foreground: wye('type'),
        },
      },
      {
        scope: 'namespace',
        settings: {
          foreground: wye('namespace'),
        },
      },
      {
        scope: ['keyword.operator', 'meta.var.expr.ts'],
        settings: {
          foreground: wye('operator'),
        },
      },
      {
        scope: 'invalid.broken',
        settings: {
          fontStyle: 'italic',
          foreground: primer.red[7],
        },
      },
      {
        scope: 'invalid.deprecated',
        settings: {
          fontStyle: 'italic',
          foreground: primer.red[7],
        },
      },
      {
        scope: 'invalid.illegal',
        settings: {
          fontStyle: 'italic',
          foreground: primer.red[7],
        },
      },
      {
        scope: 'invalid.unimplemented',
        settings: {
          fontStyle: 'italic',
          foreground: primer.red[7],
        },
      },
      {
        scope: 'carriage-return',
        settings: {
          fontStyle: 'italic underline',
          background: pick({ light: primer.red[5], dark: primer.red[6] }),
          foreground: primer.gray[0],
          content: '^M',
        },
      },
      {
        scope: 'message.error',
        settings: {
          foreground: primer.red[7],
        },
      },
      {
        scope: 'string source',
        settings: {
          foreground,
        },
      },
      {
        scope: 'string variable',
        settings: {
          foreground: wye('string'),
        },
      },
      {
        scope: ['source.regexp', 'string.regexp'],
        settings: {
          foreground: wye('regex'),
        },
      },
      {
        scope: ['string.regexp.character-class', 'string.regexp constant.character.escape', 'string.regexp source.ruby.embedded', 'string.regexp string.regexp.arbitrary-repitition'],
        settings: {
          foreground: wye('string'),
        },
      },
      {
        scope: 'string.regexp constant.character.escape',
        settings: {
          foreground: wye('yellow'),
        },
      },
      {
        scope: ['support.constant'],
        settings: {
          foreground: wye('constant'),
        },
      },
      {
        scope: ['constant.numeric', 'number'],
        settings: {
          foreground: wye('number'),
        },
      },
      {
        scope: ['keyword.other.unit'],
        settings: {
          foreground: wye('builtin'),
        },
      },
      {
        scope: ['constant.language.boolean', 'constant.language'],
        settings: {
          foreground: wye('boolean'),
        },
      },
      {
        scope: 'meta.module-reference',
        settings: {
          foreground: primary,
        },
      },
      {
        scope: 'punctuation.definition.list.begin.markdown',
        settings: {
          foreground: wye('orange'),
        },
      },
      {
        scope: ['markup.heading', 'markup.heading entity.name'],
        settings: {
          fontStyle: 'bold',
          foreground: primary,
        },
      },
      {
        scope: 'markup.quote',
        settings: {
          foreground: wye('interface'),
        },
      },
      {
        scope: 'markup.italic',
        settings: {
          fontStyle: 'italic',
          foreground,
        },
      },
      {
        scope: 'markup.bold',
        settings: {
          fontStyle: 'bold',
          foreground,
        },
      },
      {
        scope: 'markup.raw',
        settings: {
          foreground: primary,
        },
      },
      {
        scope: ['markup.deleted', 'meta.diff.header.from-file', 'punctuation.definition.deleted'],
        settings: {
          background: primer.red[0],
          foreground: primer.red[7],
        },
      },
      {
        scope: ['markup.inserted', 'meta.diff.header.to-file', 'punctuation.definition.inserted'],
        settings: {
          background: primer.green[0],
          foreground: primer.green[6],
        },
      },
      {
        scope: ['markup.changed', 'punctuation.definition.changed'],
        settings: {
          background: primer.orange[1],
          foreground: primer.orange[6],
        },
      },
      {
        scope: ['markup.ignored', 'markup.untracked'],
        settings: {
          foreground: primer.gray[1],
          background: primer.blue[6],
        },
      },
      {
        scope: 'meta.diff.range',
        settings: {
          foreground: pick({ light: primer.purple[5], dark: primer.purple[6] }),
          fontStyle: 'bold',
        },
      },
      {
        scope: 'meta.diff.header',
        settings: {
          foreground: primer.blue[6],
        },
      },
      {
        scope: 'meta.separator',
        settings: {
          fontStyle: 'bold',
          foreground: primer.blue[6],
        },
      },
      {
        scope: 'meta.output',
        settings: {
          foreground: primer.blue[6],
        },
      },
      {
        scope: ['brackethighlighter.tag', 'brackethighlighter.curly', 'brackethighlighter.round', 'brackethighlighter.square', 'brackethighlighter.angle', 'brackethighlighter.quote'],
        settings: {
          foreground: primer.gray[6],
        },
      },
      {
        scope: 'brackethighlighter.unmatched',
        settings: {
          foreground: primer.red[7],
        },
      },
      {
        scope: ['constant.other.reference.link', 'string.other.link', 'punctuation.definition.string.begin.markdown', 'punctuation.definition.string.end.markdown'],
        settings: {
          foreground: wye('string'),
        },
      },
      {
        scope: ['markup.underline.link.markdown'],
        settings: {
          foreground: secondaryForeground,
          fontStyle: 'underline',
        },
      },
      {
        scope: ['type.identifier'],
        settings: {
          foreground: wye('class'),
        },
      },
      {
        scope: ['entity.other.attribute-name.html.vue'],
        settings: {
          foreground: wye('function'),
        },
      },
      {
        scope: ['invalid.illegal.unrecognized-tag.html'],
        settings: {
          fontStyle: 'normal',
        },
      },
    ],
    rules: [],
  }

  // monaco rules
  interface TokenRule {
    token: string
    foreground?: string
  }

  const rules: TokenRule[] = []

  for (const { scope, settings } of theme.tokenColors) {
    for (const s of toArray(scope)) {
      rules.push({
        token: s,
        foreground: settings.foreground?.replace('#', ''),
      })
    }
  }

  theme.rules = rules

  return theme
}
