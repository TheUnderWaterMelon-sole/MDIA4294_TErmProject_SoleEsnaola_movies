// multer is a middleware for handling file uploads.
const multer = require("multer");

// Configure multer for file uploads so we can store items later on
const storage = multer.diskStorage({
	// Set the destination for uploaded files
	destination: (req, file, cb) => {
		// 'public/images' is the directory where files will be stored, because we are using the 'public' folder as a static folder
		cb(null, "public/images");
	},
	// Set the filename for uploaded files
	filename: (req, file, cb) => {
		// Use the current timestamp and the original file name to create a unique filename
		//    @NOTE: This is a simple way to avoid filename conflicts
		cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
	},
});

// Create the upload middleware with the storage configuration above
const upload = multer({ storage: storage });

// Export the upload middleware to be used in other files
module.exports = upload;
