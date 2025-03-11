import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Signup function to register a new user
const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { _id: newUser._id, role: newUser.role },
      process.env.JWT_KEY,
      { expiresIn: '10d' }
    );

    // Send back the response with the token and user details
    res.status(201).json({
      success: true,
      token,
      user: { _id: newUser._id, username: newUser.username, role: newUser.role }
    });

  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Login function for existing users
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User Not Found' });
    }

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Wrong Password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: '10d' }
    );

    // Send the response with the token and user details
    res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, username: user.username, role: user.role }
    });

  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

export { signUp, login };
