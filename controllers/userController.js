import User from '../models/user.js';
import mongoose from 'mongoose';

export const createUser = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const newUser = new User({ name, phone });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET all users
export const getUsers = async (req, res) => {
  console.log("🔥 GET /api/users was called");
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error in getUsers:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


// GET one user by ID

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // ✅ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('❌ Error fetching user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// UPDATE user
export const updateUser = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE MULTIPLE USERS
export const createMultipleUsers = async (req, res) => {
  try {
    const users = req.body; // expects an array of user objects

    if (!Array.isArray(users)) {
      return res.status(400).json({ message: 'Request body must be an array' });
    }

    const insertedUsers = await User.insertMany(users);
    res.status(201).json({
      message: `${insertedUsers.length} users created successfully`,
      users: insertedUsers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


