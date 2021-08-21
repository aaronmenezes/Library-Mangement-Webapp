import logo from './logo.svg';
import './App.css';
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'
import { useState,useEffect } from 'react';
import { HashRouter as Router,Route, Switch} from "react-router-dom";

function App() {
  const [token, setToken] = useState();
  
  let localStorage= window.localStorage;

  useEffect(() => { 
    if(localStorage.getItem('usertoken'))
      setToken( JSON.parse(localStorage.getItem('usertoken')))
  },[]);

  const setUserToken=(data)=>{
    var receiveddata = JSON.stringify(data); 
    localStorage.setItem('usertoken', receiveddata); 
    setToken(data)
  }

  const logoutUser=()=>{
    localStorage.removeItem('usertoken')
    setToken(null)
  }

  if(!token) {
    return <Signin setToken={setUserToken} />
  } 
  return (  
    <div className="wrapper"> 
      <Router>        
        <Route exact path="/" component={Dashboard} > 
        <Dashboard user_token={token} logout={logoutUser}/> </Route>
      </Router>
    </div>
  );
}

export default App; 