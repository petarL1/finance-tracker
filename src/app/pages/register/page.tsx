'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import styles from './Register.module.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful. Redirecting to login...');
        setError('');
        // Clear form fields
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        // Redirect to login page
        setTimeout(() => {
          router.push('/pages/login');
        }, 2000); // Redirect after 2 seconds
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
          <label className={styles.label} htmlFor="username">Username</label>
          <input
            className={styles.input}
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className={styles.label} htmlFor="password">Password</label>
          <input
            className={styles.input}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className={styles.label} htmlFor="confirmPassword">Confirm Password</label>
          <input
            className={styles.input}
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className={styles.submitButton} type="submit">Register</button>
        </form>
      <div className={styles.buttonContainer}>
          <button className={styles.haveAccount} onClick={() => router.push('/pages/login')}>Already have an account?
          </button>
          </div>
        </div>
    </div>
  );
};

export default RegisterPage;
