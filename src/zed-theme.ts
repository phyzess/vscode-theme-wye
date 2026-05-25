import { WyeThemes } from './colors'
import { getColors } from './primer'

export function getZedTheme({ style, name, soft = false, black = false, italic = false }) {
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

  const appearance = style === 'light' ? 'light' : 'dark'
  const italicStyle = italic ? { font_style: 'italic' } : {}

  return {
    name,
    author: 'phyzess',
    themes: [
      {
        name,
        appearance,
        style: {
          // Background colors
          background,
          'surface.background': activeBackground,
          'elevated_surface.background': activeBackground,
          
          // Border colors
          border,
          'border.variant': border,
          'border.focused': wye('pink'),
          'border.selected': primary,
          'border.transparent': background,
          'border.disabled': pick({ light: primer.gray[2], dark: primer.gray[1] }),

          // Text colors
          text: foreground,
          'text.muted': secondaryForeground,
          'text.placeholder': secondaryForeground,
          'text.disabled': pick({ light: primer.gray[4], dark: primer.gray[5] }),
          'text.accent': primary,

          // Icon colors
          icon: foreground,
          'icon.muted': secondaryForeground,
          'icon.disabled': pick({ light: primer.gray[4], dark: primer.gray[5] }),
          'icon.placeholder': secondaryForeground,
          'icon.accent': primary,

          // Element colors
          'element.background': activeBackground,
          'element.hover': pick({ light: '#22222208', dark: '#2f3e46' }),
          'element.active': pick({ light: '#22222215', dark: '#52796f' }),
          'element.selected': pick({ light: '#22222215', dark: '#52796f' }),
          'element.disabled': activeBackground,

          // Ghost element colors
          'ghost_element.background': background,
          'ghost_element.hover': pick({ light: '#22222208', dark: '#2f3e46' }),
          'ghost_element.active': pick({ light: '#22222215', dark: '#52796f' }),
          'ghost_element.selected': pick({ light: '#22222215', dark: '#52796f' }),
          'ghost_element.disabled': background,

          // Drop target
          'drop_target.background': pick({ light: '#22222215', dark: '#2f3e46' }),

          // Status colors
          error: wye('red'),
          'error.background': pick({ light: wye('red') + '15', dark: wye('red') + '15' }),
          'error.border': wye('red'),

          warning: wye('orange'),
          'warning.background': pick({ light: wye('orange') + '15', dark: wye('orange') + '15' }),
          'warning.border': wye('orange'),

          success: wye('green'),
          'success.background': pick({ light: wye('green') + '15', dark: wye('green') + '15' }),
          'success.border': wye('green'),

          info: wye('blue'),
          'info.background': pick({ light: wye('blue') + '15', dark: wye('blue') + '15' }),
          'info.border': wye('blue'),

          hint: wye('cyan'),
          'hint.background': pick({ light: wye('cyan') + '15', dark: wye('cyan') + '15' }),
          'hint.border': wye('cyan'),

          // Git status colors
          created: wye('green'),
          'created.background': pick({ light: wye('green') + '15', dark: wye('green') + '15' }),
          'created.border': wye('green'),

          modified: wye('blue'),
          'modified.background': pick({ light: wye('blue') + '15', dark: wye('blue') + '15' }),
          'modified.border': wye('blue'),

          deleted: wye('red'),
          'deleted.background': pick({ light: wye('red') + '15', dark: wye('red') + '15' }),
          'deleted.border': wye('red'),

          conflict: wye('orange'),
          'conflict.background': pick({ light: wye('orange') + '15', dark: wye('orange') + '15' }),
          'conflict.border': wye('orange'),

          ignored: wye('ignored'),
          'ignored.background': pick({ light: wye('ignored') + '15', dark: wye('ignored') + '15' }),
          'ignored.border': wye('ignored'),

          hidden: pick({ light: primer.gray[4], dark: primer.gray[5] }),
          'hidden.background': pick({ light: primer.gray[1], dark: primer.gray[8] }),
          'hidden.border': pick({ light: primer.gray[3], dark: primer.gray[6] }),

          renamed: wye('cyan'),
          'renamed.background': pick({ light: wye('cyan') + '15', dark: wye('cyan') + '15' }),
          'renamed.border': wye('cyan'),

          // Predictive
          predictive: pick({ light: primer.gray[5], dark: primer.gray[4] }),
          'predictive.background': pick({ light: primer.gray[1], dark: primer.gray[8] }),
          'predictive.border': pick({ light: primer.gray[3], dark: primer.gray[6] }),

          // Link
          'link_text.hover': primary,

          // Editor
          'editor.foreground': foreground,
          'editor.background': background,
          'editor.gutter.background': background,
          'editor.subheader.background': activeBackground,
          'editor.active_line.background': pick({ light: '#22222208', dark: '#252b2a' }),
          'editor.highlighted_line.background': pick({ light: '#22222208', dark: '#252b2a' }),
          'editor.line_number': pick({ light: primer.gray[4], dark: primer.gray[5] }),
          'editor.active_line_number': activeForeground,
          'editor.invisible': pick({ light: primer.gray[3], dark: primer.gray[6] }),
          'editor.wrap_guide': pick({ light: primer.gray[2], dark: primer.gray[7] }),
          'editor.active_wrap_guide': pick({ light: primer.gray[3], dark: primer.gray[6] }),
          'editor.indent_guide': pick({ light: primer.gray[2], dark: primer.gray[7] }),
          'editor.indent_guide_active': pick({ light: primer.gray[3], dark: primer.gray[6] }),
          'editor.document_highlight.read_background': pick({ light: '#22222208', dark: '#2f3e46' }),
          'editor.document_highlight.write_background': pick({ light: '#22222215', dark: '#52796f' }),
          'editor.document_highlight.bracket_background': pick({ light: '#22222215', dark: '#52796f' }),

          // Terminal
          'terminal.background': background,
          'terminal.foreground': foreground,
          'terminal.ansi.black': pick({ light: WyeThemes.background[0], dark: WyeThemes.foreground[1] }),
          'terminal.ansi.red': wye('red'),
          'terminal.ansi.green': wye('green'),
          'terminal.ansi.yellow': wye('yellow'),
          'terminal.ansi.blue': wye('blue'),
          'terminal.ansi.magenta': wye('magenta'),
          'terminal.ansi.cyan': wye('cyan'),
          'terminal.ansi.white': pick({ light: WyeThemes.foreground[0], dark: WyeThemes.foreground[0] }),
          'terminal.ansi.bright_black': pick({ light: '#aaaaaa', dark: '#777777' }),
          'terminal.ansi.bright_red': wye('red'),
          'terminal.ansi.bright_green': wye('green'),
          'terminal.ansi.bright_yellow': wye('yellow'),
          'terminal.ansi.bright_blue': wye('blue'),
          'terminal.ansi.bright_magenta': wye('magenta'),
          'terminal.ansi.bright_cyan': wye('cyan'),
          'terminal.ansi.bright_white': pick({ light: '#dddddd', dark: '#ffffff' }),

          // Title bar
          'title_bar.background': background,
          'title_bar.inactive_background': background,

          // Toolbar
          'toolbar.background': background,

          // Tab bar
          'tab_bar.background': background,
          'tab.inactive_background': background,
          'tab.active_background': background,

          // Status bar
          'status_bar.background': background,

          // Panel
          'panel.background': background,
          'panel.focused_border': primary,

          // Pane
          'pane.focused_border': primary,
          'pane_group.border': border,

          // Scrollbar
          'scrollbar.thumb.background': pick({ light: primer.gray[3] + '80', dark: primer.gray[6] + '80' }),
          'scrollbar.thumb.hover_background': pick({ light: primer.gray[4] + '80', dark: primer.gray[5] + '80' }),
          'scrollbar.thumb.border': pick({ light: primer.gray[2] + '80', dark: primer.gray[7] + '80' }),
          'scrollbar.track.background': background,
          'scrollbar.track.border': border,

          // Search
          'search.match_background': pick({ light: wye('yellow') + '40', dark: wye('yellow') + '40' }),

          // Syntax highlighting
          syntax: {
            comment: {
              color: wye('comment'),
              font_style: 'italic',
            },
            string: {
              color: wye('string'),
            },
            'string.escape': {
              color: wye('constant'),
            },
            'string.regex': {
              color: wye('regex'),
            },
            'string.special': {
              color: wye('string'),
            },
            'string.special.symbol': {
              color: wye('constant'),
            },
            number: {
              color: wye('number'),
            },
            boolean: {
              ...italicStyle,
              color: wye('boolean'),
            },
            constant: {
              ...italicStyle,
              color: wye('constant'),
            },
            variable: {
              color: wye('variable'),
            },
            'variable.special': {
              color: wye('builtin'),
            },
            function: {
              color: wye('function'),
            },
            keyword: {
              ...italicStyle,
              color: wye('keyword'),
            },
            operator: {
              color: wye('operator'),
            },
            type: {
              color: wye('type'),
            },
            interface: {
              color: wye('interface'),
            },
            class: {
              color: wye('class'),
            },
            constructor: {
              color: wye('class'),
            },
            property: {
              color: wye('property'),
            },
            attribute: {
              color: wye('property'),
            },
            tag: {
              color: wye('keyword'),
            },
            namespace: {
              color: wye('namespace'),
            },
            punctuation: {
              color: wye('punctuation'),
            },
            'punctuation.bracket': {
              color: wye('punctuation'),
            },
            'punctuation.delimiter': {
              color: wye('punctuation'),
            },
            'punctuation.special': {
              color: wye('operator'),
            },
            label: {
              color: wye('variable'),
            },
            title: {
              color: wye('function'),
              font_weight: 700,
            },
            link_text: {
              color: wye('string'),
            },
            link_uri: {
              color: wye('cyan'),
            },
            emphasis: {
              font_style: 'italic',
            },
            'emphasis.strong': {
              font_weight: 700,
            },
            variant: {
              color: wye('constant'),
            },
            embedded: {
              color: foreground,
            },
            preproc: {
              ...italicStyle,
              color: wye('builtin'),
            },
            hint: {
              color: wye('cyan'),
            },
            predictive: {
              color: pick({ light: primer.gray[5], dark: primer.gray[4] }),
              font_style: 'italic',
            },
            primary: {
              color: primary,
            },
          },
        },
      },
    ],
  }
}

