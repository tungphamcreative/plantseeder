import React from 'react';
import { AuthUserContext } from './Session';
import { Redirect } from 'react-router'

import SignOut from './SignOutButton';

const Home = () => (
    <div>
        <SignOut />
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ?
                "hello"
                :
                <Redirect to="/signin" />               
            }
        </AuthUserContext.Consumer>
    </div>
)


export default Home;