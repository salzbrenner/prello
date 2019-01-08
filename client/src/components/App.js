import React, { Component } from 'react';
import HeaderContainer from 'components/Header/HeaderContainer.js'
import {Route, Switch} from 'react-router-dom';
import Login from '../routes/login/Login';
import Register from '../routes/register/Register';
import Logout from '../routes/logout/Logout';
import Home from '../routes/home/Home';

class App extends Component {
  render() {
    return (
        <div>
          <HeaderContainer/>
          <Switch>
            <Route path={'/login'} component={Login}/>
            <Route path={'/register'} component={Register}/>
            <Route path={'/logout'} component={Logout}/>
            <Route path='/' component={Home}/>
          </Switch>
        </div>
    );
  }
}

export default App;