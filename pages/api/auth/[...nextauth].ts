import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyUser } from "../../../src/lib/auth"; 
import { verifyPassword } from "../../../src/lib/auth"; 

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials'); 
          return null;}

        const user = await verifyUser(credentials.email);
        
        if (user && await verifyPassword(credentials.password, user.password)) {
          console.log('User authenticated successfully:', { id: user.id, email: user.email }); 
          return { id: user._id.toString(), email: user.email }; 
        } else {
          console.log('Authentication failed for user:', user ? user.email : 'User not found'); 
          return null; 
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      
      if (user) {
        token.id = user.id; 
        token.email = user.email; 
      }
      return token; 
    },
    async session({ session, token }) {
      
      session.id = token.id as string; 
      session.email = token.email as string; 
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