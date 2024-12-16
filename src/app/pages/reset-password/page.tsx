'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import zxcvbn from 'zxcvbn';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  
import styles from './ResetPassword.module.css';

const ResetPassword = ({ searchParams }: { searchParams: { token?: string } }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tokenValid, setTokenValid] = useState(true);
  const [loading, setLoading] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthFeedback, setStrengthFeedback] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const token = searchParams.token;

  useEffect(() => {
    if (!token) {
      console.error('No token found in query parameters.');
      setTokenValid(false);
      setLoading(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(`/api/auth/verify-reset-token?token=${token}`);
        const data = await res.json();

        if (!data.valid) {
          setTokenValid(false);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setTokenValid(false);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPassword(input);

    if (!input) {
      setPasswordStrength(0);
      setStrengthFeedback('');
      return;
    }

    const result = zxcvbn(input);
    setPasswordStrength(result.score);
    setStrengthFeedback(result.feedback.suggestions ? '' : '');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError('Both password fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength < 3) {
      setError('Password is too weak. Please choose a stronger password.');
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Password reset successful');
        setTimeout(() => {
          router.push('/pages/login');
        }, 2000);
      } else {
        setError(data.message || 'Error resetting password');
      }
    } catch (err) {
      setError('An error occurred, please try again later');
    }
  };

  if (loading) {
    return <div className={styles.errorDiv}>Loading...</div>;
  }

  if (!tokenValid) {
    return <div className={styles.errorDiv}>Invalid or expired token. Please request a new password reset.</div>;
  }

  return (
    <div className={styles.resetPasswordContainer}>
      <form className={styles.resetPasswordForm} onSubmit={handleSubmit}>
        <h1 className={styles.resetPasswordTitle}>Reset Your Password</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}

        <label className={styles.resetPasswordLabel} htmlFor="password">
          New Password:
        </label>
        <div className={styles.passwordContainer}>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            className={styles.resetPasswordInput}
          />
          <button
            type="button"
            tabIndex={-1}
            className={styles.showPasswordButton}
            onClick={toggleShowPassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {password && (
          <>
            <div className={styles.progressBarContainer}>
              <div
                className={styles.progressBar}
                style={{
                  width: `${(passwordStrength + 1) * 20}%`,
                  backgroundColor: ['#ff4d4d', '#ff8533', '#ffd11a', '#99cc00', '#33cc33'][passwordStrength],
                }}
              />
            </div>
            <p className={styles.passwordStrength}>
              Password Strength: {['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength]}
            </p>
            {strengthFeedback && <p className={styles.suggestions}>{strengthFeedback}</p>}
          </>
        )}

        <label className={styles.resetPasswordLabel} htmlFor="confirmPassword">
          Confirm Password:
        </label>
        <div className={styles.passwordContainer}>
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.resetPasswordInput}
          />
        </div>

        <button type="submit" className={styles.resetPasswordButton}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
