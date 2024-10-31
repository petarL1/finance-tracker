import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import NextAuth, { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    username: string;}

  interface Session {
    id: string; 
    username: string;}

  interface Token {
    id: string; 
    username: string;}
}

declare module 'next' {
  interface NextApiRequest {
    user?: { 
      userId: string;
      username: string;
    } | JwtPayload;
  }}
