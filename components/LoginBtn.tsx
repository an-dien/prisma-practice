import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="flex items-center space-x-5">
        {session.user?.email}
        {/* <img alt="profile" className="rounded-full w-12 h-12" src={user.picture ? user.picture : ''} /> */}
        <button
          className="inline-flex items-center bg-blue-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-blue-250 rounded ml-4"
          onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <>
      <button
          className="inline-flex items-center bg-blue-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-blue-250 rounded ml-4"
        onClick={() => signIn()}>Sign in</button>
    </>
  )
}