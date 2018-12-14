import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import '../styles/ChangePassword.scss';

import { withFirebase } from './Firebase';

const ChangePasswordPage = () => (
    <section className="CenterLayout">
        <Card className="ChangePasswordBox">
            <ChangePasswordForm />
        </Card>
    </section>
);

const INITIAL_STATE = {
    password: '',
    password2: '',
    error: null,
};

class ChangePasswordFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { password, password2 } = this.state;

        this.props.firebase
            .doPasswordChange(password, password2)
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
            password,
            password2,
            error,
        } = this.state;

        const isInvalid =
            password !== password2 ||
            password === '';

        return (
            <form className="ChangePasswordForm" onSubmit={this.onSubmit}>
                <TextField id="outlined-password" name="password" label="Password" type="password" margin="normal" value={password} onChange={this.onChange} />
                <TextField id="outlined-password2" name="password2" label="Confirm Password" type="password" margin="normal" value={password2} onChange={this.onChange} />
                <div className="actions">
                    <Button variant="contained" color="primary" type="submit" disabled={isInvalid}>Change password</Button>
                </div>
                {error && <p style={{color: 'red'}}>{error.message}</p>}
            </form>
        );
    }
}

const ChangePasswordForm = compose(
    withRouter,
    withFirebase,
)(ChangePasswordFormBase);

export default ChangePasswordPage;

export { ChangePasswordForm };
