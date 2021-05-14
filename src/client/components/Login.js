import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { loginUser } from '../store/storeComponents/loginUser';
import { Redirect } from 'react-router';
import './styles/Login.css';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            room: '',
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
            this.props.loginUser(this.state);
            // setTimeout(() => {
            // this.setState({ loading: false, success: true });
            // }, 1000);
             this.setState({success:true});
        } 
        catch (error) {
            console.log(error);
            }
    }

    render() {
        const { name, room, success} = this.state;
        const { onChange, onSubmit } = this;

        if (success) {
            return <Redirect to='/Chat' />;
          }
        return (
            <div className="login">
                    <form onSubmit={onSubmit} autoComplete='off'>
                <TextField
                    id='standard-basic'
                    required={true}
                    placeholder='Username'
                    value={name}
                    onChange={onChange}
                    name='name'
                    type='name'
                    autoComplete='name'
                />
                <TextField
                    id='standard-adornment-password'
                    required={true}
                    placeholder='Room'
                    value={room}
                    onChange={onChange}
                    name='room'
                    type='room'
                    autoComplete='room'
                />
                <Button
                    variant='contained'
                    type='submit'
                    // style={{ marginTop: '1rem' }}
                >
                    Login
                </Button>
                {/* <Button
                    variant='contained'
                    type='submit'
                    color='primary'
                    style={{ marginTop: '1rem' }}
                >
                    Login
                </Button> */}
                </form>
                    
                    {/* <Link onClick ={event => (!name || !room) ? event.preventDefault(): null} to= {`/chat ? name = ${name} & room=${room}`}>
                        <button className="button mt-20" type="submit">Sign In</button> 
                    </Link> */}
                
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
// export default Join;