import logo from './logo.svg';
import './App.css';
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'
import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Signin setToken={setToken} />
  }
  return (  
    <div className="wrapper">
      <h1>Application</h1>
        <BrowserRouter>
        <Switch>        
        <Route path="/dashboard">
            <Dashboard />
          </Route>
          {/* <Route path="/preferences">
            <Preferences />
          </Route> */}
        </Switch>
          </BrowserRouter>
    </div>
  );
}

export default App;

// <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>