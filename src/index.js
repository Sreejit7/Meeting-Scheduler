import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './hooks/useGlobalContext';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home';
import Navbar from './components/Navbar';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/calendar" component={App} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
