import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { client } from "./sanity/lib/client"
import { Author } from "./sanity.types";
import { checkExistingUsername } from "./sanity/lib/update-username";
import { uploadImageFromUrl } from "./sanity/lib/image";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string | null;
      id?: string | null;
    };
  }
  interface User {
    username?: string | null;
  }

  interface JWT {
    username?: string | null;
    id?: string | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile, account }) {
      try {
        const provider = account?.provider;
        let id: string;
        let name: string;
        let username: string;
        let avatarUrl: string | undefined;
        let email: string | undefined;
        let bio: string;

        if (provider === "github") {
          id = String(profile?.id);
          name = (profile?.name as string) || "Unknown";
          username = (profile?.login as string) || "";
          avatarUrl = profile?.avatar_url as string;
          email = profile?.email as string;
          bio = (profile?.bio as string) || "No bio available";
        } else if (provider === "google") {
          id = profile?.sub as string;
          name = (profile?.name as string) || "Unknown";
          username = ((profile?.email as string) ?? "").split("@")[0] || "";
          avatarUrl = profile?.picture as string;
          email = profile?.email as string;
          bio = "No bio available";
        } else {
          return false;
        }

        const author = await client.withConfig({useCdn: false}).fetch(
          `*[_type == "author" && id == $id][0]`, { id }
        ) as Author;

        if (author) {
          return true;
        }

        const imageRef = avatarUrl ? await uploadImageFromUrl(avatarUrl) : undefined;
        const finalUsername = await checkExistingUsername(username);

        await client.create({
          _type: "author",
          name,
          username: finalUsername,
          image: imageRef,
          email,
          bio,
          id,
          provider: provider || "unknown",
        });

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error)
        return false
      }
    },
  async jwt({ token, profile, account }) {
    let id: string | undefined;
    if (profile) {
      id = account?.provider === "google"
        ? (profile.sub as string)
        : String(profile.id);
    } else {
      id = token.id as string | undefined;
    }

    if (id) {
      const author = await client.withConfig({useCdn: false}).fetch(
        `*[_type=="author" && id == $id][0]{username}`,
        { id }
      );
      if (author) {
        token.username = author.username;
        token.id = id;
      }
    }
    return token;
  },

  async session({ session, token }) {
    if (token.username) {
      session.user.username = token.username as string;
      session.user.id = token.id as string;
    }
    return session;
  }},
  secret: process.env.AUTH_SECRET
});
