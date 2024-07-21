import fs from "fs";
import Jimp from "jimp";
import https from 'https';
import http from 'http';


// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL) {
  return new Promise((resolve, reject) => {
    console.log(inputURL)
    const protocol = inputURL.startsWith('https') ? https : http;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    protocol.get(inputURL, options, (response) => {
      console.log(response)
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to fetch image, status code: ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => {
        const imageBuffer = Buffer.concat(chunks);

        Jimp.read(imageBuffer)
          .then(photo => {
            const outpath = "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
            photo
              .resize(256, 256) // resize
              .quality(60) // set JPEG quality
              .greyscale() // set greyscale
              .write(outpath, () => {
                resolve(outpath);
              });
          })
          .catch(error => {
            console.error('Error filtering image:', error);
            reject(error);
          });
      });
    }).on('error', (error) => {
      console.error('Error fetching image:', error);
      reject(error);
    });
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
