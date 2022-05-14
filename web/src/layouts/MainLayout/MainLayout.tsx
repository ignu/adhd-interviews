import { Link, routes } from '@redwoodjs/router'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <div>
        <header>
          <h1>ADHD Interview Prep</h1>
          <nav>
            <ul>
              <li>
                <Link to={routes.resources()}>Resources</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </div>
    </>
  )
}

export default MainLayout
