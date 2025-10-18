import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Success from './components/Success';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={Login} />
        <Route path="/success" element={Success} />
      </Routes>
    </Router>
  );
}

export default App;
