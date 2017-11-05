import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './components/Main';

const App = () =>
    
    <Router>
      <Route path='/' component={Main} />
    </Router>

export default App;
