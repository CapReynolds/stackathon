import React from "react";
import {Route, NavLink, HashRouter, Switch, Redirect} from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import App from "./App";
import Chat from "./Chat2";
import Login from "./Login";
//import StartDialog from "./StartDialog";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import HomeIcon from '@material-ui/icons/Home';
import theme from './utils/theme';

const Nav = (props) => {
    return (
      <div className="nav">
        <NavLink to="/Home" style={{ textDecoration: 'none'}}><HomeIcon color="secondary"/></NavLink>   
        <Button>
            <NavLink to="/Home" style={{ textDecoration: 'none', color:"cornsilk"}}>
                <Typography variant="h6">Login</Typography>
            </NavLink>
        </Button>
      </div>
    );
}
 
  
export default Nav;
