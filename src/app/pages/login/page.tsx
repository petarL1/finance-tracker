'use client';
import { useState } from 'react';
import styles from './Login.module.css';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);

        setSuccess('Login successful.');
        setError('');
        router.push('/pages/profile');        
        setUsername('');
        setPassword('');
      } else {
        setError(data.message || 'Login failed');
        setSuccess('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setSuccess('');
    }};  
    return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <form className={styles.loginForm} onSubmit={handleSubmit}>
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
          <button className={styles.submitButton} type="submit">Log In</button>
        </form>
        <div className={styles.buttonContainer}>
          <button className={styles.createAccount} onClick={() => router.push('/pages/register')}>Create an account</button>
        </div>
      </div>
    </div>);
};

export default LoginPage;
