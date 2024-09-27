// types/next-auth.d.ts

import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
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

// Define the type for the user attached to the request
declare module 'next' {
  interface NextApiRequest {
    user?: string | JwtPayload; // Or you can define a custom User type if needed
  }
}
