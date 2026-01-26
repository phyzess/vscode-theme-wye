import { promises as fs } from 'node:fs'
import { getZedTheme } from './zed-theme'

const themeContent = JSON.stringify(
  {
    name: 'Wye',
    author: 'phyzess',
    themes: [
      ...getZedTheme({
        style: 'light',
        name: 'Wye Light',
      }).themes,
      ...getZedTheme({
        style: 'dark',
        name: 'Wye Dark',
      }).themes,
      ...getZedTheme({
        style: 'dark',
        name: 'Wye Black',
        black: true,
      }).themes,
      ...getZedTheme({
        style: 'light',
        name: 'Wye Light Soft',
        soft: true,
      }).themes,
      ...getZedTheme({
        style: 'dark',
        name: 'Wye Dark Soft',
        soft: true,
      }).themes,
    ],
  },
  null,
  2
) + '\n'

// Create directories and write theme files
Promise.all([
  fs.mkdir('./zed-themes', { recursive: true }),
  fs.mkdir('./extensions/zed/themes', { recursive: true }),
])
  .then(() =>
    Promise.all([
      // Write to zed-themes directory (for reference)
      fs.writeFile('./zed-themes/wye.json', themeContent),
      // Write to Zed extension directory (for publishing)
      fs.writeFile('./extensions/zed/themes/wye.json', themeContent),
    ])
  )
  .then(() => {
    console.log('✅ Zed themes generated successfully!')
    console.log('   - zed-themes/wye.json (reference)')
    console.log('   - extensions/zed/themes/wye.json (for Zed extension)')
  })
  .catch((err) => {
    console.error('❌ Error generating Zed themes:', err)
    process.exit(1)
  })

