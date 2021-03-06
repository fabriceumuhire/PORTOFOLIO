const multer = require('multer');

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
      return cb(null, true);
    }
    return cb(new Error('File is not supported'), false);
  },
});
