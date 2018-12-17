import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import { AuthUserContext } from './Session';
import { Redirect } from 'react-router'
import { compose } from 'recompose';

import SignOutButton from './SignOutButton';

const HomePage = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ?
                    <HomePlant uid={authUser.uid} userName={authUser.displayName} email={authUser.email} />
                    :
                    <Redirect to="/signin" />
            }
        </AuthUserContext.Consumer>
    </div>
)

const INITIAL_STATE = {
    level: 1,
    money: 100,
    plants: []
};

const PLANTS = [
    {
        name: 'Rose',
        lifeTime: 100,
        life: 100,
        growthTime: 10,
        growth: 0,
        isPoison: false,
        money: 10,
        experience: 5
    },
    {
        name: 'Lily',
        lifeTime: 50,
        life: 50,
        growthTime: 20,
        growth: 0,
        isPoison: false,
        money: 20,
        experience: 15
    }
]

class HomePlantBase extends Component {
    constructor(props) {
        super(props);
    }

    handleChangePlant = () => {
    }
    render() {
        let userInformation = {};
        this.props.firebase.doGetUserInformation(this.props.uid).onSnapshot((doc) => {
            if (doc.exists) {
                userInformation = doc.data();
            } else {
                this.props.firebase.doCreateNewPlantInformation(this.props.uid, INITIAL_STATE);
            }
        });
        return (
            <div>
                <div>
                    Hello, {this.props.displayName || this.props.email}
                    <SignOutButton />
                </div>
                <div>
                    {
                        userInformation.plants && userInformation.plants.map((plant, index) => {
                            return <div key={index}>{plant.name}</div>
                        })
                    }
                </div>
                <div>
                    <select value={this.state.value} onChange={this.handleChangePlant}>
                        {
                            PLANTS.map((p, index) => {
                                return <option key={index} value={p}>{p.name}</option>
                            })
                        }
                    </select>
                    <button>choose</button>
                </div>
            </div>
        );
    }
}

const HomePlant = compose(
    withFirebase,
)(HomePlantBase);

export default HomePage;

export { HomePlant };