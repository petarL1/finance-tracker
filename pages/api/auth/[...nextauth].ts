import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyUser } from "../../../src/lib/auth"; 
import { verifyPassword } from "../../../src/lib/auth"; 

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        
        if (!credentials?.username || !credentials?.password) {
          console.log('Missing credentials'); 
          return null;}

        const user = await verifyUser(credentials.username);
        console.log('User fetched:', user); 
        
        if (user && await verifyPassword(credentials.password, user.password)) {
          console.log('User authenticated successfully:', { id: user.id, username: user.username }); 
          return { id: user._id.toString(), username: user.username }; 
        } else {
          console.log('Authentication failed for user:', user ? user.username : 'User not found'); 
          return null; 
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      
      if (user) {
        token.id = user.id; 
        token.username = user.username; 
      }
      return token; 
    },
    async session({ session, token }) {
      
      session.id = token.id as string; 
      session.username = token.username as string; 
      return session; 
    }
  },
  pages: {
    signIn: "/pages/login" 
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || 'mysecretkey', 
  },
  session: {
    strategy: 'jwt', 
  },
});