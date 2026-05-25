import { promises as fs } from 'node:fs'
import { themeVariants } from './variants'
import { getZedTheme } from './zed-theme'

const themeContent = JSON.stringify(
  {
    name: 'Wye',
    author: 'phyzess',
    themes: themeVariants.flatMap((variant) => getZedTheme(variant).themes),
  },
  null,
  2
) + '\n'

// Create directory and write theme file
fs.mkdir('./themes', { recursive: true })
  .then(() => fs.writeFile('./themes/wye.json', themeContent))
  .then(() => {
    console.log('✅ Zed theme generated successfully!')
    console.log('   - themes/wye.json (for Zed extension)')
  })
  .catch((err) => {
    console.error('❌ Error generating Zed theme:', err)
    process.exit(1)
  })
