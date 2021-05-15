import React from "react";
import {Route, NavLink, HashRouter} from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import Chat from "./Chat";
import Login from "./Login";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import HomeIcon from '@material-ui/icons/Home';
import theme from './utils/theme'

class Main extends React.Component {
  render() {
    return (
        <HashRouter>
            <div>
          <h1>StackAThon</h1>
          <ThemeProvider theme={theme}>
          <AppBar position="static" color="primary">
            <Toolbar>
            <NavLink to="/Login" style={{ textDecoration: 'none'}}><HomeIcon color="secondary"/></NavLink>
           
            <Button><NavLink to="/Login" style={{ textDecoration: 'none', color:"cornsilk"}}><Typography variant="h6">Login</Typography></NavLink></Button>
            </Toolbar>
          </AppBar>
          </ThemeProvider>
          <div className="content">
            <Route path="/Home" component={Login} exact />
            <Route path="/Game" component={Game} exact />
            <Route path="/Login" component={Login} exact />
            <Route path="/Chat" component={Chat} exact />
          </div>
        </div>
        </HashRouter>
    );
  }
}
 
export default Main;