import crypto from 'crypto';
import { sendEmail } from './sendEmail';
import { updateResetToken } from './updateResetToken';

export const sendResetPasswordEmail = async (email: string) => {
  const token = crypto.randomBytes(32).toString('hex');
  const expiration = new Date(Date.now() + 3600000);

  
  const updated = await updateResetToken(email, token, expiration);
  if (!updated) {
    console.error('Failed to update reset token for email:', email);
    return { success: false };
  }

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/pages/reset-password?token=${token}`;
  
  const templateData = {
    name: 'User', 
    resetLink,
  };
  const sent = await sendEmail(email, 'Password Reset Request', 'resetPassword', templateData);
  return { success: true };
};
