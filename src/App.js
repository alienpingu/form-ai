import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'

import {HashRouter as Router, Route} from 'react-router-dom'


import Train from './Components/Train'


function App() {
  return (
    <div className="App">
      <Router>
            <Route path="/">
              <Train />
            </Route>
      </Router>
    </div>
  );
}

export default App;
