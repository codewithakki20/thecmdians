const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2; 

// Load environment variables
dotenv.config();

if (!process.env.MONGO_URI || !process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("❌ Missing required environment variables");
  process.exit(1);
}

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "https://thecmdians-79bd.vercel.app"],
  methods: ["GET", "POST", "DELETE", "PATCH"],
  credentials: true,
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

// ✅ User Schema & Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  course: { type: String, required: true },
  mobile: { type: String, required: true },
  picture: { type: String },
  cloudinary_id: { type: String },
});

const User = mongoose.model("User", userSchema);

// ✅ Register User (Fixed Validation)
app.post("/api/v1/register", upload.single("picture"), async (req, res) => {
  const { name, fatherName, course, mobile } = req.body;

  if (!name || !fatherName || !course || !mobile) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newUser = new User({
      name,
      fatherName,
      course,
      mobile,
      picture: req.file ? req.file.path : "",
      cloudinary_id: req.file ? req.file.filename : "",
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("❌ Error registering user:", err);
    res.status(500).json({ error: "Error registering user" });
  }
});

// ✅ Get All Registered Users (With Pagination)
app.get("/api/v1/users", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// ✅ Delete User (Ensures Cloudinary Image Deletion)
app.delete("/api/v1/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.cloudinary_id) {
      await cloudinary.uploader.destroy(user.cloudinary_id);
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
});

// ✅ Comment Schema & Model
const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

// Get All Comments
app.get("/api/v1/comments", async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments" });
  }
});

// Post a Comment
app.post("/api/v1/comments", async (req, res) => {
  const { name, email, comment } = req.body;
  if (!name || !email || !comment) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newComment = new Comment({ name, email, comment });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Error saving comment" });
  }
});


// Delete a Comment by ID
app.delete("/api/v1/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully", id });
  } catch (error) {
    res.status(500).json({ error: "Error deleting comment" });
  }
});

// ✅ Image Schema & Model
const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  cloudinary_id: { type: String, required: true },
});

const Image = mongoose.model("Image", imageSchema);

// ✅ Upload Image
app.post('/api/v1/upload', upload.single('image'), async (req, res) => {

  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided' }); 
  }

  try {
    const newImage = new Image({
      title,
      url: req.file.path,
      cloudinary_id: req.file.filename,
    });

    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (err) {
    console.error('Error saving image:', err.message);
    res.status(500).json({ message: 'Error uploading image', error: err.message });
  }
});

// ✅ Fetch All Images
app.get('/api/v1/images', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const images = await Image.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching images', error: err.message });
  }
});

// Update Image Metadata
app.patch('/api/v1/images/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const updatedImage = await Image.findByIdAndUpdate(id, { title }, { new: true });
    if (!updatedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json(updatedImage);
  } catch (err) {
    res.status(500).json({ message: 'Error updating image', error: err.message });
  }
});

// ✅ Delete Image
app.delete('/api/v1/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    await cloudinary.uploader.destroy(image.cloudinary_id);
    await Image.deleteOne({ _id: id });

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting image', error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
