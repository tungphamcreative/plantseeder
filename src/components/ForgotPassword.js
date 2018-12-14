import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { compose } from 'recompose';

import '../styles/ForgotPassword.scss';

import { withFirebase } from './Firebase';

const ForgotPasswordPage = () => (
    <section className="CenterLayout">
        <Card className="ForgotPasswordBox">
            <ForgotPasswordForm />
        </Card>
    </section>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class ForgotPasswordFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                <Redirect to="/signin" />
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
        const { email, error } = this.state;

        const isInvalid = email === '';

        return (
            <form className="ForgotPasswordForm" onSubmit={this.onSubmit}>
                <TextField id="outlined-email" name="email" label="Email" margin="normal" value={email} onChange={this.onChange} />
                <div className="actions">
                    <Button variant="contained" color="primary" type="submit" disabled={isInvalid}>Reset Password</Button>
                </div>
                {error && <p style={{color: 'red'}}>{error.message}</p>}
            </form>
        );
    }
}

const ForgotPasswordForm = compose(
    withRouter,
    withFirebase,
)(ForgotPasswordFormBase);

export default ForgotPasswordPage;

export { ForgotPasswordForm };
