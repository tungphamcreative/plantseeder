import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import { AuthUserContext } from './Session';
import { Redirect } from 'react-router'
import { compose } from 'recompose';

import Plant from './Plant';

import '../styles/Home.scss';
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
        lifeTime: 20,
        life: 20,
        growthTime: 60,
        growth: 0,
        isPoison: false,
        isDeath: false,
        isDone: false,
        money: 10,
        experience: 5
    },
    {
        name: 'Lily',
        lifeTime: 10,
        life: 10,
        growthTime: 30,
        growth: 0,
        isPoison: false,
        isDeath: false,
        isDone: false,
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

    handleUpdatePlant = () => {
        this.state.plantData.forEach((plant) => {
            let { id, life, growth, growthTime } = plant;
            if (life > 0 && growth <= growthTime) {
                growth++;
                life--;
                this.props.firebase.doUpdatePlantInformation(this.props.uid, id, growth, life);
            }
        })
    }

    onUserUpdate = (querySnapshot) => {
        this.setState({
            userData: querySnapshot.data()
        });
    }

    onPlantUpdate = (querySnapshot) => {
        let plants = [];
        querySnapshot.forEach((doc) => {
            plants.push({ id: doc.id, ...doc.data() });
        });
        this.setState({
            plantData: plants
        });
    }

    componentDidMount() {
        this.userInfo.onSnapshot(this.onUserUpdate);
        this.plantInfo.onSnapshot(this.onPlantUpdate);
        const intervalId = setInterval(this.handleUpdatePlant, 1000);
        this.setState({ intervalId: intervalId });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        return (
            <div className="HomePage">
                <div className="UserInfo">
                    Hello, {this.props.displayName || this.props.email}
                </div>
                <div className="PlantGarden">
                    {
                        this.state.plantData.map((plant, index) => {
                            return <Plant key={index} plant={plant} />
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