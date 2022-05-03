import fs from 'fs'
import path from 'path'

import pug from 'pug'

const DIST = './docs'
const SOURCES = './src'

fs.mkdirSync(DIST, { recursive: true })
fs.readdirSync(DIST)
  .filter(x => fs.rmSync(path.join(DIST, x), { recursive: true, force: true }))

const filenames = fs.readdirSync(SOURCES).filter(x => !x.startsWith('_'))

for (const filename of filenames) {
  const file = path.join(SOURCES, filename)
  const parts = path.parse(file)
  const ext = parts.ext === '.pug' ? '.html' : parts.ext
  const dist = path.format({ ...parts, base: '', dir: DIST, ext })
  const data = parts.ext === '.pug' ? pug.compileFile(file)() : fs.readFileSync(file)
  fs.writeFileSync(dist, data)
}
