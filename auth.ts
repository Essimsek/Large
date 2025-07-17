import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string | null;
    };
  }
  interface User {
    username?: string | null;
  }

  interface JWT {
    username?: string | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
    })
  ],
  callbacks: {
    async signIn(params) {
      try {
        const username = params.profile?.login
        const author = await client.fetch(`*[_type == "author" && id == $id][0]`, { id: params.profile?.id })
        if (author) {
          return true
        } else {
          await client.create({
            _type: "author",
            name: params.profile?.name || "Unknown",
            username: username,
            image: params.profile?.avatar_url,
            email: params.profile?.email,
            bio: params.profile?.bio || "No bio available",
            id: params.profile?.id
          })
          return true
        }
      } catch (error) {
        console.error("Error in signIn callback:", error)
        return false
      }
    },
  async jwt({ token, profile, trigger, session }) {
    if (profile) {
      const author = await client.fetch(`*[_type == "author" && id == $id][0]`, { id: profile.id })
      if (author) {
        token.username = author.username;
      }
    }
    return token;
  },

  async session({ session, token }) {
    if (token.username) {
      session.user.username = token.username as string;
    }
    return session;
  }},
  secret: process.env.AUTH_SECRET
})
