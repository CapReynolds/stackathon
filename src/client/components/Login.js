import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, TextField, Select, MenuItem, FormControl} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { loginUser } from '../store/storeComponents/loginUser';
import { Redirect } from 'react-router';
import './styles/Login.css';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            room: 1,
            success: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(ev) {
        this.setState({ [ev.target.name]: ev.target.value });
    }

    async onSubmit(ev) {
        try {
            ev.preventDefault();
            if(this.state.name.length > 1)
            {
                this.props.loginUser(this.state);
                this.setState({success:true});
            }
            else{
                alert("Enter a valid Username");
               }
        } 
        catch (error) {
            console.log(error);
        }
    }

    render() {
        const { name, room, success} = this.state;
        const { onChange, onSubmit } = this;

        if (success) {
            return <Redirect to='/App' />;
        }

        const error = name.length < 1;
        
        return (
            <div className="login">
                <Box display="flex" p={2}>
                    <FormControl required>
                <TextField
                    required
                    id='standard-basic'
                    placeholder='Username'
                    value={name}
                    onChange={onChange}
                    name='name'
                    type='name'
                    autoComplete='name'
                    helperText={error ? "Input a name" : null}
                    error={error}
                />
              
                <Select
                    
                    labelId="select-label"
                    id="select"
                    name='room'
                    value={room}
                    onChange={onChange}
                    style={{minWidth: 120}}
                >
                    <MenuItem value={1}>Room 1</MenuItem>
                    <MenuItem value={2}>Room 2</MenuItem>
                    <MenuItem value={3}>Room 3</MenuItem>
                </Select>
                    <Box  sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 2,
                            }} >
                        <Button
                            variant='contained'
                            type='submit'
                            color='secondary'
                            onClick={onSubmit}
                        >
                            Login
                        </Button>
                    </Box>
                </FormControl>
            </Box>
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      loginUser: (user) => dispatch(loginUser(user)),
    };
};
  
const mapStateToProps = (state) => state;
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);
