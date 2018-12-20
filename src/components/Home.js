import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import { AuthUserContext } from './Session';
import { Redirect } from 'react-router'
import { compose } from 'recompose';

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
    money: 100
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
        this.plantInfo = this.props.firebase.doGetPlantInformation(this.props.uid);
        this.userInfo.get().then((doc) => {
            if (!doc.exist) {
                this.props.firebase.doCreateNewUserInformation(this.props.uid, INITIAL_STATE);
            }
        })
        this.state = {
            userData: {},
            plantData: [],
            value: PLANTS[0]['name']
        }
    }

    handleChangePlant = (e) => {
        this.setState({ value: e.target.value });
    }

    handleAddPlant = () => {
        const plant = PLANTS.filter((p) => {
            return p.name === this.state.value;
        })
        this.props.firebase.doAddNewPlant(this.props.uid, plant[0]);
    }

    onUserUpdate = (querySnapshot) => {
        this.setState({
            userData: querySnapshot.data()
        });
    }

    onPlantUpdate = (querySnapshot) => {
        let plants = [];
        var self = this;
        querySnapshot.forEach(function (doc) {
            plants.push({ id: doc.id, ...doc.data() });
        });
        this.setState({
            plantData: plants
        });
    }

    componentDidMount() {
        this.userInfo.onSnapshot(this.onUserUpdate);
        this.plantInfo.onSnapshot(this.onPlantUpdate);
        const intervalId = setInterval(this.updatePlantInfo, 1000);
    }

    render() {
        return (
            <div>
                <div>
                    Hello, {this.props.displayName || this.props.email}
                </div>
                <div>
                    {
                        this.state.plantData.map((plant, index) => {
                            return <div key={index}>{`${plant.name} ${plant.growth} ${plant.life}`}</div>
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
                    <button onClick={this.handleAddPlant}>choose</button>
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