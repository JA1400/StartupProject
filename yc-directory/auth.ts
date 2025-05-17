import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const githubId = profile.id?.toString();
        const username = profile.login;
        const name = profile.name || user.name || username;
        const email = profile.email || user.email || null;
        const image = profile.avatar_url || user.image || null;
        const bio = profile.bio || "";

        // Create or ensure existence of author in Sanity
        await writeClient.createIfNotExists({
          _type: "author",
          _id: `github-${githubId}`, // avoids collisions
          id: profile.id,
          name,
          username,
          email,
          image,
          bio,
        });

        return true; // allow sign-in
      } catch (error) {
        console.error("SignIn error:", error);
        return false; // block sign-in on error
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: `github-${profile?.id}`,
        });

        console.log("Found User", JSON.stringify(user));

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
