import NextAuth, { Session } from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"
import Auth0Provider from "next-auth/providers/auth0"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID || '',
      clientSecret: process.env.AUTH0_CLIENT_SECRET || '',
      issuer: process.env.AUTH0_ISSUER_BASE_URL || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID || '',
      clientSecret: process.env.COGNITO_CLIENT_SECRET || '',
      issuer: process.env.COGNITO_ISSUER || '',
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    },
    async callback({ session }: { session: Session}) {
      const user = session.user;
      if (user) {
        // const role = await prisma.role.findFirstOrThrow({
        //   where: { code: "USER" },
        // });
        await prisma.user.upsert({
          where: {
            email: user.email,
          },
          create: {
            email: user.email,
            role: 'USER',
            image: user.picture,
          },
          update: {
            image: user.picture,
          },
        });
      }
      return session;
    },
  }
}

export default NextAuth(authOptions)