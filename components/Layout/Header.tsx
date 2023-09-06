// components/Layout/Header.tsx
import React from 'react'
import Link from 'next/link'
// import { useUser } from '@auth0/nextjs-auth0/client'
import { Auth } from "@aws-amplify/auth";
import { useAuth } from '../../hooks/useAuth';

const signOut = async (event: React.MouseEvent) => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
};

const Header = () => {
  const { user, accessToken, signOut } = useAuth();
  console.log(accessToken);
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            ></path>
          </svg>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {user ? (
            <div className="flex items-center space-x-5">
              <span>Hi, {user.username}</span>
              <button onClick={signOut} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                Logout
              </button>
              {!!accessToken.payload && !!accessToken.payload["cognito:groups"] && (accessToken.payload["cognito:groups"] as string[]).includes("Admin") && (
                <div className="flex items-center justify-center mr-5 capitalize bg-blue-500 py-1 px-3 rounded-md text-white">
                  <Link href="/admin">
                      + Create
                  </Link>
                </div>
              )}
              {/* <img alt="profile" className="rounded-full w-12 h-12" src={user.picture ? user.picture : ''} /> */}
            </div>
          ) : (
            <Link href="/api/auth/login" className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header