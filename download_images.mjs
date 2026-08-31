import fs from 'fs';
import path from 'path';

const targetUrls = [
  'https://www.indiamart.com/abn-servo-care-system/',
  'https://www.indiamart.com/abn-servo-care-system/profile.html',
  'https://www.indiamart.com/abn-servo-care-system/products-and-services.html',
  'https://www.indiamart.com/abn-servo-care-system/photos.html'
];

const outputDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function scrapeAndDownload() {
  console.log("Fetching images from IndiaMART...");
  const imageUrls = new Set();

  for (const url of targetUrls) {
    try {
      console.log(`Fetching ${url}`);
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      const html = await res.text();
      
      // Regex match image sources
      const matches = html.matchAll(/(?:src|data-src|data-original)=["'](https:\/\/[^"']+\.(?:jpg|jpeg|png|webp)[^"']*)["']/gi);
      for (const match of matches) {
        let imgUrl = match[1];
        if (imgUrl.includes('500x500') || imgUrl.includes('250x250') || imgUrl.includes('125x125') || imgUrl.includes('imimg') || imgUrl.includes('catalog')) {
          imageUrls.add(imgUrl);
        }
      }
    } catch (e) {
      console.error(`Failed to fetch ${url}:`, e.message);
    }
  }

  console.log(`Found ${imageUrls.size} product/photo images.`);
  let count = 0;
  const downloadedMap = [];

  for (const imgUrl of imageUrls) {
    try {
      count++;
      const ext = path.extname(imgUrl.split('?')[0]) || '.jpg';
      const filename = `img_${count}${ext}`;
      const destPath = path.join(outputDir, filename);

      const imgRes = await fetch(imgUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      const arrayBuffer = await imgRes.arrayBuffer();
      fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
      console.log(`Saved ${filename} (${arrayBuffer.byteLength} bytes) from ${imgUrl}`);
      downloadedMap.push({ url: imgUrl, local: `/images/${filename}` });
    } catch (e) {
      console.error(`Failed downloading ${imgUrl}:`, e.message);
    }
  }

  fs.writeFileSync(path.join(process.cwd(), 'downloaded_images.json'), JSON.stringify(downloadedMap, null, 2));
  console.log("Done downloading images!");
}

scrapeAndDownload();
