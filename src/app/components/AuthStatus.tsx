'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthStatus = () => {
  const [status, setStatus] = useState('unauthenticated');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const checkTokenValidity = () => {
      if (!token) {
        setStatus('unauthenticated');
        return;
      }

      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
          setStatus('authenticated');
        } else {
          localStorage.removeItem('token');
          setStatus('unauthenticated');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        setStatus('unauthenticated');
      }
    };

    checkTokenValidity();
  }, []);

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
