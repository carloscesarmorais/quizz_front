import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Quizz from './Screees/Quizz'
import Finish from './Screees/Finish'
import Home from './Screees/Home'

export default function App() {
    return (
      <Router>
        <div style={{ overflow: 'auto' }}>
          <Switch>
            <Route path="/fim">
              <Finish />
            </Route>
            <Route path="/quizz">
              <Quizz />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    )
}
