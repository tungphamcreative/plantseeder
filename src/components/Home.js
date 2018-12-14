import React from 'react';
import { AuthUserContext } from './Session';

import SignOut from './SignOutButton';

const Home = () => (
    <div>
        <SignOut />
        <AuthUserContext.Consumer>
            {authUser =>
                console.log(authUser)}
        </AuthUserContext.Consumer>
    </div>
)


export default Home;