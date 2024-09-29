// types/next-auth.d.ts

import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import NextAuth, { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  // Extend the User interface to include the username property
  interface User extends DefaultUser {
    username: string; // Add your custom properties here
  }

  interface Session {
    id: string; // Add your custom properties here
    username: string; // Add your custom properties here
  }

  interface Token {
    id: string; // Add your custom properties here
    username: string; // Add your custom properties here
  }
}

// Extend NextApiRequest to include user property
declare module 'next' {
  interface NextApiRequest {
    user?: { // Define the shape of your user object
      userId: string;
      username: string;
    } | JwtPayload; // You can also keep the JwtPayload type if necessary
  }
}
