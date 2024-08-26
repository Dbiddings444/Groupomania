const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/uploads/');
	},
	filename: (req, file, cb) => {
		let name = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
		req.body.content = name;
		cb(null, name);
	}
});

const fileFilter = (req, file, cb) => {
	if ((file.mimetype).includes('jpeg') || (file.mimetype).includes('png')) {
		cb(null, true);
	} else {
		cb(null, false);
	}
}

let upload = multer({ 
	storage: storage,
	fileFilter: fileFilter 
});

module.exports = upload.single('media');