import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
 
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
        const author = await client.fetch(`*[_type == "author" && username == $username][0]`, { username })
        if (author) {
          console.log("Author found")
          return true
        } else {
          console.log("Author not found, creating new author")
          await client.create({
            _type: "author",
            name: params.profile?.name || "Unknown",
            username: username,
            image: params.profile?.avatar_url,
            email: params.profile?.email,
            bio: params.profile?.bio || "No bio available"
          })
          return true
        }
      } catch (error) {
        console.error("Error in signIn callback:", error)
        return false
      }
    },
  },
  secret: process.env.AUTH_SECRET
})
