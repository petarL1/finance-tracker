import User from "../models/User";

export const updateResetToken = async (email: string, resetToken: string, expiryDate: Date) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { resetToken, resetTokenExpiration: expiryDate },
      { new: true } 
    );
    if (!user) {
      throw new Error('User not found');
    }

    return true; 
  } catch (error) {
    console.error('Error updating reset token:', error);
    throw new Error('Failed to update reset token');
  }
};
