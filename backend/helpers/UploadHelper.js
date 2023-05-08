const Multer = require('multer');

const diskStorage = Multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads');
  },
  filename: function (_req, _file, cb) {
    const uniqueSuffix = new Date().toISOString().replace(/:/g, '-').replace('.', '') + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix);
  }
});

const fileFilter = (_req, file, cb) => {
  try {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    }

    cb(null, false);
  } catch (error) {
    cb(new Error(error.message));
  }
}

const multerOptions = { diskStorage, fileFilter };
const storageUpload = Multer(multerOptions);

const fileSizeFormatter = (bytes, decimals) => {
  if (bytes == 0) return '0 Bytes';
  var k = 1024,
    dm = decimals || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

module.exports = {
  storageUpload,
  fileSizeFormatter,
};