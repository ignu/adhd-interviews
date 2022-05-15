import { CurrentUser, useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { useEffect, useState } from 'react'

type MainLayoutProps = {
  children?: React.ReactNode
}

const LogoutButton = () => {
  const { getCurrentUser } = useAuth()
  const [user, setUser] = useState<CurrentUser | undefined>()

  useEffect(() => {
    ;(async () => {
      const u = await getCurrentUser()
      setUser(u)
    })()
  }, [])

  if (!user) return null
  return <>Logged in as {user.name}</>
}

const LoginButton = () => {
  const { isAuthenticated, getCurrentUser } = useAuth()

  if (!isAuthenticated) {
    ;<>
      <Link to={routes.login()} className="rw-link">
        Log in
      </Link>
      <Link to={routes.signup()} className="rw-link">
        Signup
      </Link>
    </>
  }

  return <LogoutButton />
}
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <div>
        <header>
          <h1>ADHD Interview Prep</h1>
          <nav>
            <Link to={routes.resources()}>Resources</Link>
          </nav>
          <LoginButton />
        </header>
        <main>{children}</main>
      </div>
    </>
  )
}

export default MainLayout
