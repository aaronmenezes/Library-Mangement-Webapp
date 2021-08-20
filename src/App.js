import logo from './logo.svg';
import './App.css';
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'
import { useState } from 'react';
import { HashRouter as Router,Route, Switch} from "react-router-dom";

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Signin setToken={setToken} />
  } 
  return (  
    <div className="wrapper"> 
      <Router>        
        <Route exact path="/" component={Dashboard} > 
        <Dashboard user_token={token} /> </Route>
      </Router>
    </div>
  );
}

export default App; 