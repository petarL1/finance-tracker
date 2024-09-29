'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../context/AuthContext'; // Ensure correct path
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

interface ClientLayoutProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Error caught in ErrorBoundary:', error);
    // Optionally log error to an external service here
  }

  render() {
    if (this.state.hasError) {
      return <h1 className='errorHeading'>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <Navbar />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Footer />
      </AuthProvider>
    </SessionProvider>
  );
}
