const https = require("https");
/**
 * The `imageDownload` function downloads an image from a given URL using a Promise in JavaScript.
 * @param url - The `imageDownload` function you provided is designed to download an image from a given
 * URL using Node.js. The function checks if a valid URL is provided and then uses the `https.get`
 * method to download the image data asynchronously.
 * @returns The `imageDownload` function returns a Promise that resolves with the downloaded image data
 * as a Buffer.
 */
module.exports = (url) => {
  if (!(url && /^https?:\/\/[^ ]+$/.test(url)))
    throw new TypeError("A valid url is required");

  return new Promise((resolve) => {
    https.get(url, (response) => {
      let data = Buffer.from([], "binary");

      response.on("data", (chunk) => {
        const buffer = Buffer.from(chunk, "binary");
        const length = data.length + buffer.length;

        data = Buffer.concat([data, buffer], length);
      });

      response.on("end", () => {
        resolve(data);
      });
    });
  });
};
