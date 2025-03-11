// backend/controller/authController.js
import bcrypt from 'bcrypt';
import User from '../models/NewUser.js';  // Your User model
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role },  // Include user ID and role in the token
      process.env.JWT_KEY,  // Secret key
      { expiresIn: '10d' }  // Token expiration time
    );

    // Send success response with token and user info
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { _id: user._id, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const verify = async (req, res) => {
  try {
    const user = req.user;  // The user object is set by the authMiddleware
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error in verify:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
