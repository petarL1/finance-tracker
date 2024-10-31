'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../context/AuthContext'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

interface ClientLayoutProps {
  children: React.ReactNode;
}
export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <Navbar />
          {children}
        <Footer />
      </AuthProvider>
    </SessionProvider>
  );}