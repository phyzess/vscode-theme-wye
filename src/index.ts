import { promises as fs } from 'node:fs'
import getTheme from './theme'
import { themeVariants } from './variants'

fs.mkdir('./vscode-themes', { recursive: true })
  .then(() =>
    Promise.all(
      themeVariants.map((variant) =>
        fs.writeFile(
          `./vscode-themes/${variant.fileSlug}.json`,
          `${JSON.stringify(
            getTheme(variant),
            null,
            2
          )}\n`
        )
      )
    )
  )
  .catch(() => process.exit(1))
