'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthStatus = () => {
  const [status, setStatus] = useState('unauthenticated');

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Decode the token
        const decodedToken: any = jwtDecode(token);
        console.log('Decoded token:', decodedToken); // Check what gets decoded
        console.log('Token expiration time:', new Date(decodedToken.exp * 1000));
        console.log('Current time:', new Date());
        // Check if the token has an exp field and if it's valid
        if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
          setStatus('authenticated');
          console.log('Token is valid and not expired');
        } else if (!decodedToken.exp) {
          console.log('Token does not have an expiration field');
          setStatus('authenticated'); // Handle tokens without an exp field (optional)
        } else {
          console.log('Token is expired');
          setStatus('unauthenticated');
          localStorage.removeItem('token'); // Clear invalid token
        }
      } catch (error) {
        console.error('Invalid token');
        setStatus('unauthenticated');
      }
    } else {
      setStatus('unauthenticated'); // No token found
    }
  }, []); // Only runs after component mounts

  return (
    <div>
      {status === 'authenticated' ? (
        <p>User is authenticated</p>
      ) : (
        <p>User is unauthenticated</p>
      )}
    </div>
  );
};

export default AuthStatus;
