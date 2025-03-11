// backend/routes/newUser.js (or any other suitable name for the route)

import express from 'express';
import bcrypt from 'bcrypt';
import NewUser from '../models/NewUser.js'; // Make sure you have a model for NewUser
const router = express.Router();

// Route to handle new user registration
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await NewUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new NewUser({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
