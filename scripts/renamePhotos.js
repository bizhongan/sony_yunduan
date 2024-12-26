import fs from 'fs'
import path from 'path'

const PHOTOS_DIR = 'public/photos'
const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter']

SEASONS.forEach(season => {
  const seasonDir = path.join(PHOTOS_DIR, season)
  if (!fs.existsSync(seasonDir)) return

  const files = fs.readdirSync(seasonDir)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
    .sort()

  files.forEach((file, index) => {
    const oldPath = path.join(seasonDir, file)
    const prefix = season.toLowerCase()
    const newPath = path.join(seasonDir, `${prefix}_${index + 1}.jpg`)
    fs.renameSync(oldPath, newPath)
    console.log(`Renamed: ${file} -> ${prefix}_${index + 1}.jpg`)
  })
})

console.log('All photos renamed successfully!') 