export class ImageUtils {
  public static getBase64ImageFromFile(imageFile: Blob, maxImageSizeInMb = 5): Promise<string> {
    return new Promise<string>(function (resolve, reject) {
      if (!imageFile) {
        reject(Error('No Image File'));
      }
      const reader = new FileReader();
      if (maxImageSizeInMb && imageFile.size / 1024 / 1024 > maxImageSizeInMb) {
        reject(Error('Exceeded image max size'));
      }

      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        if (reader.result) {
          resolve(`data:image/png;base64,${reader.result.toString().split(',')[1]}`);
        } else {
          reject(Error('File could not be loaded'));
        }
      };
    });
  }
}