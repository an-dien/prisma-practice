import '../styles/tailwind.css'
// import { UserProvider } from '@auth0/nextjs-auth0/client'
import Layout from '../components/Layout'
import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import apolloClient from '../lib/apollo'

import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../aws-exports';
Amplify.configure({
  Auth: {
      region: awsExports.REGION,
      userPoolId: awsExports.USER_POOL_ID,
      userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Authenticator hideSignUp>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Authenticator>
  );
}

export default MyApp