// backend/models/NewUser.js
import mongoose from 'mongoose';

const newUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },  // Default role is 'user'
  createdAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false }, // Optional: To track if the user is verified
});

const NewUser = mongoose.model('NewUser', newUserSchema);

export default NewUser;
