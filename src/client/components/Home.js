import React, { Component } from "react";
import StartDialog from "./StartDialog";
import { ThemeProvider } from '@material-ui/styles';
import theme from './utils/theme';
 
class Home extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
         <StartDialog></StartDialog>
      </ThemeProvider>
    );
  }
}
 
export default Home;