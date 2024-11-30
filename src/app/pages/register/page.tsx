'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import zxcvbn from 'zxcvbn';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import eye icons
import styles from './Register.module.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthFeedback, setStrengthFeedback] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength < 3) {
      setError('Password is too weak. Please choose a stronger password.');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful. Redirecting to login...');
        setError('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          router.push('/pages/login');
        }, 2000);
      } else {
        setError(data.message || 'Registration failed');
        setSuccess('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <h1 className={styles.title}>Register</h1>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <form className={styles.registerForm} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            className={styles.input}
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className={styles.label} htmlFor="password">Password</label>
          <div className={styles.passwordContainer}>
            <input
              className={styles.input}
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
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

          <label className={styles.label} htmlFor="confirmPassword">Confirm Password</label>
          <input
            className={styles.input}
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          
          <button className={styles.submitButton} type="submit">Register</button>
        </form>
        <div className={styles.buttonContainer}>
          <button className={styles.haveAccount} onClick={() => router.push('/pages/login')}>
            Already have an account?
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
