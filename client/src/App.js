import React from 'react';
import Home from './Home';
import User from './User';
import UserChange from './UserChange';
import OrderAdd from './OrderAdd';
import OrderChange from './OrderChange';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';


function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/user/:userId" exact>
            <User />
          </Route>
          <Route path="/add" exact>
            <UserChange method="add" />
          </Route>
          <Route path="/add-order/:userId" exact>
            <OrderAdd method="add" />
          </Route>
          <Route path="/change/:userId" exact>
            <UserChange method="change" />
          </Route>
          <Route path="/change-order/:orderId" exact>
            <OrderChange method="change" />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
