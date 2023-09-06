import { Auth, Hub } from 'aws-amplify';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState<any>({});
  const [accessToken, setAccessToken] = useState<any>('');

  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  useEffect(() => {
    const getAuthenticatedUser = async () => {
      const authenticatedUser = await Auth.currentAuthenticatedUser();

      // if the user is not logged in, return an empty object
      if (!authenticatedUser || typeof authenticatedUser === 'undefined') return {}
    
      console.log(authenticatedUser);

      setUser({
        ...authenticatedUser.attributes,
        username: authenticatedUser.username,
      });
      setAccessToken(authenticatedUser.signInUserSession.accessToken);
    }

    getAuthenticatedUser();

    Hub.listen('auth', async ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          console.log('Event name -> ', event, data)
          setUser(data);  // NOT WORK
          console.log(user);
          console.log(data.signInUserSession.idToken.payload);
          break
        case 'signOut':
          console.log('sign out')
          setUser({});
          break
        default:
          console.log('Unhandled use case - ' + event)
      }

      getAuthenticatedUser()
    })
  }, [Auth, setUser, setAccessToken]);
  

  return {
    user,
    accessToken,
    signOut,
  }
}
