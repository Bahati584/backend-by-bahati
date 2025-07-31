import express from 'express';
import { createMultipleUsers } from '../controllers/userController.js';




import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser


} from '../controllers/userController.js';

const router = express.Router();

// PUT /users/:id - Replace full user
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PATCH /users/:id - Partial update
router.patch('/:id', async (req, res) => {
  try {
    const patchedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!patchedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(patchedUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /users/:id - Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// Define routes for user operations
router.post('/', createUser); // Create
router.get('/', getUsers); // Read all
router.get('/:id', getUserById); // Read one
router.put('/:id', updateUser); // Update
router.delete('/:id', deleteUser); // Delete 
router.post('/bulk', createMultipleUsers); // POST /api/users/bulk



export default router;
