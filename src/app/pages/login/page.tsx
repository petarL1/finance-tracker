'use client';
import { useState } from 'react';
import styles from './Login.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
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
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);

        setSuccess('Login successful.');
        setError('');
        router.push('/pages/profile');        
        setEmail('');
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
          <input
            className={styles.input}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className={styles.forgotPass}>
        <Link href="/pages/forgot-password">Forgot your password?</Link> 
      </div>
          <button className={styles.submitButton} type="submit">Log In</button>
        </form>
        <div className={styles.buttonContainer}>
          <button className={styles.createAccount} onClick={() => router.push('/pages/register')}>Create an account</button>
        </div>
      </div>
    </div>);
};

export default LoginPage;
