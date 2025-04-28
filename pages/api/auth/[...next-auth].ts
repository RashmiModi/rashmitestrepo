import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      phone?: string | null;
      accessToken?: string | null;
    };
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    phone?: string | null;
    accessToken?: string | null;
  }
}
console.log("client ID------->  ",process.env.GOOGLE_CLIENT_ID!)

export const authOptions: NextAuthOptions = {

   
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        console.log(" token.id ,jwt inside", token.id )
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        
        (session.user as any).id = token.id;

        console.log(token.id)
      }
      return session;
    },
    async signIn(user) {
        console.log(" user signin---->", user )
      return true;
    },
  },
};


export default NextAuth(authOptions);
