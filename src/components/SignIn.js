import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import '../styles/SignIn.scss';

import { withFirebase } from './Firebase';
import { AuthUserContext } from './Session';

const SignInPage = () => (
    <AuthUserContext.Consumer>
        {
            authUser =>
                authUser ? 
                <Redirect to="/" />
                :
            <section className="CenterLayout">
                <Card className="SignInBox">
                    <SignInForm />
                </Card>
            </section>
        }
    </AuthUserContext.Consumer>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                <Redirect to="/" />
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    };


    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <form className="SignInForm" onSubmit={this.onSubmit}>
                <TextField id="outlined-email" name="email" label="Email" margin="normal" value={email} onChange={this.onChange} />
                <TextField id="outlined-password" name="password" label="Password" type="password" margin="normal" value={password} onChange={this.onChange} />
                <div className="actions">
                    <Button variant="contained" color="primary" type="submit" disabled={isInvalid}>Log in</Button>
                    <Link to="/forgotpassword">Forgot password?</Link>
                    <Link to="/signup">Don't have a account?</Link>
                </div>
                {error && <p style={{color: 'red'}}>{error.message}</p>}
            </form>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
