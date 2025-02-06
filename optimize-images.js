import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import glob from 'fast-glob';

// Настройки качества
const JPEG_QUALITY = 85;
const WEBP_QUALITY = 85;
const PNG_QUALITY = 70;

// Функция для обработки изображений
async function processImages() {
  const imageFiles = await glob('src/assets/img/**/*.{jpg,jpeg,png}', {
    absolute: true,
    ignore: ['**/*.bak.{jpg,jpeg,png}'], // Исключаем файлы с .bak.jpg, .bak.jpeg, .bak.png
  });

  for (const file of imageFiles) {
    const ext = path.extname(file);
    const dir = path.dirname(file);
    const baseName = path.basename(file, ext);

    const originalBackup = path.join(dir, `${baseName}.bak${ext}`); // Оригинальный backup
    const compressedOutput = path.join(dir, `${baseName}${ext}`);
    const webpOutput = path.join(dir, `${baseName}.webp`);

    try {
      // Создаем .bak если его нет (копируем оригинальный файл)
      if (!fs.existsSync(originalBackup)) {
        await fs.copy(file, originalBackup);
        console.log(`🛠️ Backup создан: ${originalBackup}`);
      }

      // Сжимаем JPEG из .bak (если есть), иначе из оригинала
      const sourceFile = fs.existsSync(originalBackup) ? originalBackup : file;

      if (ext === '.jpg' || ext === '.jpeg') {
        await sharp(sourceFile)
          .jpeg({ quality: JPEG_QUALITY })
          .toFile(compressedOutput);

        // Создаём WebP
        await sharp(sourceFile)
          .webp({ quality: WEBP_QUALITY })
          .toFile(webpOutput);
      }

      if (ext === '.png') {
        // из png webp получается большего размера => поэтому сжимаем png
        await sharp(sourceFile)
          .png({ quality: PNG_QUALITY })
          .toFile(compressedOutput);
      }

      console.log(`✅ Оптимизировано: ${file}`);
    } catch (err) {
      console.error(`❌ Ошибка обработки ${file}:`, err);
    }
  }
}

processImages();
