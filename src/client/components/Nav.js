import React from "react";
import {NavLink} from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

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
