import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ResourcesPage = () => {
  return (
    <>
      <MetaTags title="Resources" description="Resources page" />

      <h1>ResourcesPage</h1>
      <p>
        Find me in <code>./web/src/pages/ResourcesPage/ResourcesPage.tsx</code>
      </p>
      <p>
        My default route is named <code>resources</code>, link to me with `
        <Link to={routes.resources()}>Resources</Link>`
      </p>
    </>
  )
}

export default ResourcesPage
