const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Configure Cloudinary
try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log('Cloudinary configuration is valid.');
} catch (err) {
  console.error('Cloudinary configuration error:', err);
  process.exit(1);
}

// Test Upload
cloudinary.uploader.upload('E:/Picnic2/backend/images/test.jpg', { folder: 'test-folder' })
  .then(result => console.log('Upload Success:', result))
  .catch(err => console.error('Upload Error:', err));




