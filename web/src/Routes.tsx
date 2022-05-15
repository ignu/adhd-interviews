// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'
import BehavioralQuestionsLayout from 'src/layouts/BehavioralQuestionsLayout'
import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={MainLayout}>
        <Set wrap={BehavioralQuestionsLayout}>
          <Route path="/behavioral-questions/new" page={BehavioralQuestionNewBehavioralQuestionPage} name="newBehavioralQuestion" />
          <Route path="/behavioral-questions/{id}/edit" page={BehavioralQuestionEditBehavioralQuestionPage} name="editBehavioralQuestion" />
          <Route path="/behavioral-questions/{id}" page={BehavioralQuestionBehavioralQuestionPage} name="behavioralQuestion" />
          <Route path="/behavioral-questions" page={BehavioralQuestionBehavioralQuestionsPage} name="behavioralQuestions" />
        </Set>
        <Route path="/resources" page={ResourcesPage} name="resources" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
