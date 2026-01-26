import { promises as fs } from 'node:fs'
import getTheme from './theme'

fs.mkdir('./vscode-themes', { recursive: true })
  .then(() =>
    Promise.all([
      fs.writeFile(
        './vscode-themes/wye-light.json',
        `${JSON.stringify(
          getTheme({
            style: 'light',
            name: 'Wye Light',
          }),
          null,
          2
        )}\n`
      ),
      fs.writeFile(
        './vscode-themes/wye-dark.json',
        `${JSON.stringify(
          getTheme({
            style: 'dark',
            name: 'Wye Dark',
          }),
          null,
          2
        )}\n`
      ),
      fs.writeFile(
        './vscode-themes/wye-black.json',
        `${JSON.stringify(
          getTheme({
            style: 'dark',
            name: 'Wye Black',
            black: true,
          }),
          null,
          2
        )}\n`
      ),
      fs.writeFile(
        './vscode-themes/wye-light-soft.json',
        `${JSON.stringify(
          getTheme({
            style: 'light',
            name: 'Wye Light Soft',
            soft: true,
          }),
          null,
          2
        )}\n`
      ),
      fs.writeFile(
        './vscode-themes/wye-dark-soft.json',
        `${JSON.stringify(
          getTheme({
            style: 'dark',
            name: 'Wye Dark Soft',
            soft: true,
          }),
          null,
          2
        )}\n`
      ),
    ])
  )
  .catch(() => process.exit(1))
