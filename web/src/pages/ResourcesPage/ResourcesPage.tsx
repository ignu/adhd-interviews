import { MetaTags } from '@redwoodjs/web'

const ResourcesPage = () => {
  return (
    <>
      <MetaTags title="Resources" description="Resources page" />

      <h1>Resources</h1>

      <ul>
        <li>
          <a href="https://www.reddit.com/r/ADHD_Programmers/">
            ADHD Programmers Reddit
          </a>
        </li>
        <li>
          <a href="https://www.reddit.com/r/ADHD_Programmers/">ADHD 2.0</a>
          Despite a cringe-worthy title, a modern take from the seminal
          researchers on ADHD.
        </li>
      </ul>
    </>
  )
}

export default ResourcesPage
