import User from '../models/user.model.js';
import Book from '../models/book.model.js';
import Request from '../models/request.model.js';
import AppError from '../utils/AppError.js';

export const getUserById = async (id) => {
  const user = await User.findById(id).select(`
    -passwordHash -favorites -role -emailVerificationOTP 
    -emailVerificationOTPExpiry -resetPasswordOTP 
    -resetPasswordOTPExpiry -emailVerified -lendingPreferences`
  );

  const books = await Book.find({ owner: id }).sort({ createdAt: -1 }); 
  if (!user) throw new AppError('User not found', 404);
  return { user, books };
};

export const updateUserProfile = async (userId, updateData) => {
  const allowedUpdates = {};

  if (updateData.name) allowedUpdates.name = updateData.name;

  if (updateData.lendingPreferences) {
    if (updateData.lendingPreferences.visibility) {
      allowedUpdates['lendingPreferences.visibility'] = updateData.lendingPreferences.visibility;
    }
    if (updateData.lendingPreferences.hasOwnProperty('onlyLocal')) {
      allowedUpdates['lendingPreferences.onlyLocal'] = updateData.lendingPreferences.onlyLocal;
    }
  }

  const locationFields = ['address', 'city', 'state', 'country', 'pincode'];
  
  const isUpdatingLocation = locationFields.some(field => updateData[field] !== undefined);

  if (isUpdatingLocation) {
    const activeBorrows = await Request.exists({ 
      borrower: userId, 
      status: { $in: ['borrowed', 'received', 'active'] } 
    });

    if (activeBorrows) {
      const error = new Error("You cannot update your location while you have borrowed books. Please return them first.");
      error.statusCode = 403; 
      throw error;
    }

    locationFields.forEach(field => {
      if (updateData[field]) {
        allowedUpdates[field] = updateData[field];
      }
    });
  }

  const updatedUser = await User.findByIdAndUpdate(userId, 
    { $set: allowedUpdates }, 
    { new: true, runValidators: true }
  );

  return updatedUser;
};

export const updatePreferences = async (userId, prefs) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError('User not found', 404);

  user.lendingPreferences = {
    ...user.lendingPreferences,
    ...prefs,
  };

  await user.save();
  return user;
};

export const getBorrowHistory = async (userId) => {
  const history = await Request.find({
    requester: userId,
    status: 'completed',
  })
    .populate('book')
    .sort({ createdAt: -1 });

  return history;
};


export const addBookToFavorites = async (userId, bookId) => {
  const bookExists = await Book.findById(bookId);
  if (!bookExists) {
    throw new Error("Book not found");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { favorites: bookId } }, 
    { new: true }
  );

  if (!updatedUser) {
    throw new Error("User not found");
  }
  
  return updatedUser;
};
