import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type BehavioralQuestionLayoutProps = {
  children: React.ReactNode
}

const BehavioralQuestionsLayout = ({ children }: BehavioralQuestionLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.behavioralQuestions()}
            className="rw-link"
          >
            BehavioralQuestions
          </Link>
        </h1>
        <Link
          to={routes.newBehavioralQuestion()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New BehavioralQuestion
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default BehavioralQuestionsLayout
