import React from "react";
import {Route, NavLink, HashRouter, Switch} from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import App from "./App";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ThemeProvider } from '@material-ui/styles';
import HomeIcon from '@material-ui/icons/Home';
import theme from './utils/theme';


class Main extends React.Component {
  render() {
    
    return (
        <HashRouter>
            <div>
              <ThemeProvider theme={theme}>
              <AppBar position="static" color="primary">
            <Toolbar>
            <NavLink to="/Home" style={{ textDecoration: 'none'}}><HomeIcon color="secondary"/></NavLink>
            </Toolbar>
            </AppBar>
              <div className="content">
                <Switch>
                <Route path="/" component={Home} exact />
                  <Route path="/Home" component={Home} exact />
                  <Route path="/Login" component={Home} exact />
                  <Route path="/App" component={App} exact />
                  <Route path="/Game" component={Game} exact />
                </Switch>
              </div>
              </ThemeProvider> 
            </div>
        </HashRouter>
    );
  }
}
 
export default Main;