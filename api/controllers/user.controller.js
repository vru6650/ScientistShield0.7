import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

// More descriptive name for API health-check endpoint
export const checkApiHealth = (req, res) => {
  res.json({ message: 'API is working!' });
};

// --- Upgraded updateUser Function ---
export const updateUser = async (req, res, next) => {
  // Allow administrators to update any user while restricting regular users
  // to only update their own account. The previous implementation blocked
  // admins from updating other users, which is inconsistent with the
  // authorization logic used elsewhere (e.g. deleteUser).
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }

  try {
    const userToUpdate = await User.findById(req.params.userId);
    if (!userToUpdate) {
      return next(errorHandler(404, 'User not found'));
    }

    // Only accept whitelisted fields from the request body
    const {
      username,
      email,
      password,
      profilePicture,
      bio,
      profileCompleted,
    } = req.body;

    const updates = {};

    // Validate each field before applying the update
    if (username !== undefined) {
      if (typeof username !== 'string' || !/^[a-zA-Z0-9]+$/.test(username)) {
        return next(
          errorHandler(400, 'Username can only contain letters and numbers')
        );
      }
      updates.username = username;
    }

    if (email !== undefined) {
      if (
        typeof email !== 'string' ||
        !/^\S+@\S+\.\S+$/.test(email)
      ) {
        return next(errorHandler(400, 'Invalid email format'));
      }
      updates.email = email;
    }

    if (password !== undefined) {
      if (typeof password !== 'string' || password.length < 6) {
        return next(
          errorHandler(400, 'Password must be at least 6 characters long')
        );
      }
      updates.password = password;
    }

    if (profilePicture !== undefined) {
      if (typeof profilePicture !== 'string') {
        return next(errorHandler(400, 'Invalid profile picture format'));
      }
      updates.profilePicture = profilePicture;
    }

    if (bio !== undefined) {
      if (typeof bio !== 'string') {
        return next(errorHandler(400, 'Invalid bio format'));
      }
      updates.bio = bio;
    }

    if (profileCompleted !== undefined) {
      if (typeof profileCompleted !== 'boolean') {
        return next(errorHandler(400, 'Invalid profileCompleted value'));
      }
      updates.profileCompleted = profileCompleted;
    }

    // Apply validated fields to the user document
    Object.assign(userToUpdate, updates);

    // Using user.save() will trigger the Mongoose pre-save middleware
    // This automatically handles validation and password hashing as defined in the model
    const updatedUser = await userToUpdate.save();

    // Remove password before returning the user data
    const { password: _password, ...userWithoutPassword } = updatedUser._doc;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    if (error.code === 11000 && error.keyValue) {
      const field = Object.keys(error.keyValue)[0];
      return next(errorHandler(409, `${field} already exists`));
    }
    if (error.name === 'ValidationError') {
      return next(errorHandler(400, error.message));
    }
    // Mongoose validation errors will be caught here
    next(error);
  }
};

// --- deleteUser Function (already good) ---
export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};

// --- signout Function (already good) ---
export const signout = (req, res, next) => {
  try {
    res
        .clearCookie('access_token')
        .status(200)
        .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};

// --- Upgraded getUsers Function ---
export const getUsers = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit)
        .select('-password'); // Exclude password directly from the query

    const totalUsers = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users, // The password is already excluded
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

// --- Upgraded getUser Function ---
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};