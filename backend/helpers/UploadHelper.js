const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)

    const uniqueSuffix = Date().toISOString().replace(/:/g, '-') + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix)
  }
});

function fileFilter(req, file, cb) {
  try {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true)
    }

    cb(null, false)
  } catch (error) {
    cb(new Error(error.message))
  }
}

const upload = multer({ storage, fileFilter });

module.exports = {
  upload,
};