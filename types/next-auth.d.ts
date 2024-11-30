import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import NextAuth, { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    email: string;}

  interface Session {
    id: string; 
    email: string;}

  interface Token {
    id: string; 
    email: string;}
}

declare module 'next' {
  interface NextApiRequest {
    user?: { 
      userId: string;
      email: string;
    } | JwtPayload;
  }}
