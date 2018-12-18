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
    experience: 0,
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
        this.userInfo = this.props.firebase.doGetUserInformation(this.props.uid);
        this.userInfo.get().then((doc) => {
            if (!doc.exist) {
                this.props.firebase.doCreateNewPlantInformation(this.props.uid, INITIAL_STATE);
            }
        })
        this.state = {
            userData: {},
            value: PLANTS[0]['name']
        }
    }

    handleChangePlant = (e) => {
        this.setState({ value: e.target.value });
    }

    handleAddPlant = (total) => {
        const plant = PLANTS.filter((p) => {
            return p.name === this.state.value;
        })
        plant[0].id = total + 1;
        this.props.firebase.doAddNewPlantToUserInformation(this.props.uid, plant[0]);
    }

    onCollectionUpdate = (querySnapshot) => {
        this.setState({
            userData: querySnapshot.data()
       });
      }

    componentDidMount() {
        this.userInfo.onSnapshot(this.onCollectionUpdate);
      }

    render() {
        let userInformation = this.state.userData;
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
                                return <option key={index} value={p.name}>{p.name}</option>
                            })
                        }
                    </select>
                    <button onClick={() => this.handleAddPlant(userInformation.plants.length)}>choose</button>
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