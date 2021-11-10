import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// util components
import PrivateRoute from './components/PrivateRoute'
import ToastComponent from './components/ToastComponent'

// contexts
import LoginProvider from './contexts/LoginContext'
import ApiProvider from './contexts/ApiContext'

// screens
import HomeScreen from './screens/HomeScreen'
import AuthScreen from './screens/AuthScreen'

import SurveysScreen from './screens/SurveysScreen'
import CreateSurveyScreen from './screens/CreateSurveyScreen'
import ViewSurveyScreen from './screens/ViewSurveyScreen'

import RespondentSurveysScreen from './screens/RespondentSurveysScreen'

import PNFScreen from './screens/PNFScreen'

function App() {
  return (
  	<LoginProvider>
      <ApiProvider>
        <ToastComponent/>
  	 	  <Router>
  	 	  	<Switch>
  	 	  		<Route path='/' exact component={HomeScreen} />
            <Route path='/auth/:type' component={AuthScreen} />
            {/* Coordinator Routes  */}
            <PrivateRoute path='/my-surveys' role={[0]} exact component={SurveysScreen} />
            <PrivateRoute path='/create-survey' role={[0]} exact component={CreateSurveyScreen} />
            <PrivateRoute path='/view-survey/:surveyId' role={[0]} component={ViewSurveyScreen} />
            
  	 	  		{/* Respondent Routes  */}
            <PrivateRoute path='/surveys' role={[1]} exact component={RespondentSurveysScreen} />

            <Route default component={PNFScreen} />
  	 	  	</Switch>
  	 	  </Router>
      </ApiProvider>
  	</LoginProvider>
  )
}

export default App;
