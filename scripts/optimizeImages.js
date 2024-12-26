const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages(directory) {
    try {
        const files = await fs.readdir(directory);
        
        for (const file of files) {
            if (file.match(/\.(jpg|jpeg|png)$/i)) {
                const inputPath = path.join(directory, file);
                const outputPath = path.join(
                    directory,
                    `${path.parse(file).name}.webp`
                );

                await sharp(inputPath)
                    .resize(1920, null, {
                        withoutEnlargement: true,
                        fit: 'inside',
                    })
                    .webp({ quality: 85 })
                    .toFile(outputPath);

                console.log(`Optimized: ${file}`);
            }
        }
    } catch (error) {
        console.error('Error optimizing images:', error);
    }
}

// 使用方法：
// node scripts/optimizeImages.js
const photosDir = path.join(process.cwd(), 'public', 'photos');
optimizeImages(photosDir); 