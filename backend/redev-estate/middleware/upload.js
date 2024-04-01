const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).array('images', 10);

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

module.exports = upload;