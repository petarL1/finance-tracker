// src/pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyUser } from "../../../src/lib/auth"; // Adjust the path accordingly
import { verifyPassword } from "../../../src/lib/auth"; // Adjust the path accordingly

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Check for undefined credentials
        if (!credentials?.username || !credentials?.password) {
          console.log('Missing credentials'); // Log if credentials are not provided
          return null; // Return null if credentials are not provided
        }

        // Find the user by username
        const user = await verifyUser(credentials.username);
        console.log('User fetched:', user); // Log fetched user
        
        // Validate user existence and password
        if (user && await verifyPassword(credentials.password, user.password)) {
          console.log('User authenticated successfully:', { id: user.id, username: user.username }); // Log successful authentication
          return { id: user._id.toString(), username: user.username }; // Ensure _id is converted to string
        } else {
          console.log('Authentication failed for user:', user ? user.username : 'User not found'); // Log authentication failure
          return null; // Return null if authentication fails
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to the token on initial sign in
      if (user) {
        token.id = user.id; // Set user id on token
        token.username = user.username; // Set username on token
      }
      return token; // Return the token
    },
    async session({ session, token }) {
      // Add custom properties to the session
      session.id = token.id as string; // Type assertion to ensure it's a string
      session.username = token.username as string; // Type assertion to ensure it's a string
      return session; // Return the updated session
    }
  },
  pages: {
    signIn: "/pages/login" // Specify the login page path
  },
  // Configure JWT separately
  jwt: {
    secret: process.env.JWT_SECRET || 'mysecretkey', // Ensure your JWT secret is set
  },
  session: {
    strategy: 'jwt', // Use JWT strategy for sessions
  },
});
