import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import style from '../styles/SignIn.scss';
import styleCommon from '../styles/Common.scss';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const SignIn = () => (
    <section className={styleCommon.CenterLayout}>
        <Card className={style.SignInBox}>
            <SignInForm />
        </Card>
    </section>
);

export default SignIn;


const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    render() {
        return (
            <form className={style.SignInForm}>
                <TextField id="outlined-email" label="Email" margin="normal" />
                <TextField id="outlined-password" label="Password" type="password" margin="normal" />
                <div className="actions">
                    <Button variant="contained" color="primary">Log in</Button>
                    <Link to="/signup">Don't have a account?</Link>
                </div>
            </form>
        );
    }
}
