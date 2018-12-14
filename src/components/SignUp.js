import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import '../styles/SignUp.scss';

import { withFirebase } from './Firebase';
import { AuthUserContext } from './Session';

const SignUpPage = () => (
    <AuthUserContext.Consumer>
        {
            authUser => 
            authUser ? <Redirect to="/" />
            :
            <section className="CenterLayout">
                <Card className="SignUpBox">
                    <SignUpForm />
                </Card>
            </section>
        }
    </AuthUserContext.Consumer>
);

const INITIAL_STATE = {
    userName: '',
    email: '',
    password: '',
    password2: '',
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignUpWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push('/home');
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    render() {
        const {
            userName,
            email,
            password,
            password2,
            error,
        } = this.state;

        const isInvalid =
            password !== password2 ||
            password === '' ||
            email === '' ||
            userName === '';

        return (
            <form className="SignUpForm" onSubmit={this.onSubmit}>
                <TextField id="outlined-username" name="userName" label="User Name" margin="normal" value={userName} onChange={this.onChange} />
                <TextField id="outlined-email" name="email" label="Email" margin="normal" value={email} onChange={this.onChange} />
                <TextField id="outlined-password" name="password" label="Password" type="password" margin="normal" value={password} onChange={this.onChange} />
                <TextField id="outlined-password2" name="password2" label="Confirm Password" type="password" margin="normal" value={password2} onChange={this.onChange} />
                <div className="actions">
                    <Button variant="contained" color="primary" type="submit" disabled={isInvalid}>Sign Up</Button>
                    <Link to="/signin">If you already have an account, please log in here</Link>
                </div>
                {error && <p style={{color: 'red'}}>{error.message}</p>}
            </form>
        );
    }
}

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm };
