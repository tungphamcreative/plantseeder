import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import { AuthUserContext } from './Session';
import { Redirect } from 'react-router'
import { compose } from 'recompose';

import Button from '@material-ui/core/Button';

import Plant from './Plant';
import UserInfo from './UserInfomation';
import Seed from './Seed';
import PLANTS from './SeedList';
import Noti from './Snackbar';
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

class HomePlantBase extends Component {
    constructor(props) {
        super(props);
        this.userInfo = this.props.firebase.doGetUserInformation(this.props.uid);
        this.plantInfo = this.props.firebase.doGetPlantInformation(this.props.uid);
        this.userInfo.get().then((doc) => {
            if (!doc.exists) {
                this.props.firebase.doCreateNewUserInformation(this.props.uid, INITIAL_STATE);
            }
        })
        this.state = {
            userData: {},
            plantData: [],
            value: PLANTS[0]['name'],
            openNoti: false,
            messageNoti: '',
        }
    }

    handleChangePlant = (e) => {
        this.setState({ value: e.target.value });
    }

    handleAddPlant = () => {
        const plant = PLANTS.filter((p) => {
            return p.name === this.state.value;
        })
        if (this.state.userData.money < plant[0].money) {
            this.setState({ openNoti: true, messageNoti: "You don't have enough money." });
        } else {
            const { money, experience, level } = this.state.userData;
            const moneyLeft = money - plant[0].money;
            this.handleUpdateUserInformation(moneyLeft, experience, level);
            this.props.firebase.doAddNewPlant(this.props.uid, plant[0]);
        }
    }

    handleUpdateUserInformation = (money, exp, lv) => {
        this.props.firebase.doUpdateUserInformation(this.props.uid, money, exp, lv);
    }

    handleUpdatePlant = () => {
        this.state.plantData.forEach((plant) => {
            let { id, life, growth, growthTime, isDone, isDeath } = plant;
            if (life === 0 && !isDeath) {
                isDeath = true;
                this.props.firebase.doUpdatePlantInformation(this.props.uid, id, growth, life, isDeath, isDone);
            }
            if (growth === growthTime && !isDone) {
                isDone = true;
                this.props.firebase.doUpdatePlantInformation(this.props.uid, id, growth, life, isDeath, isDone);
            }
            if (!isDeath && !isDone) {
                growth++;
                life--;
                this.props.firebase.doUpdatePlantInformation(this.props.uid, id, growth, life, isDeath, isDone);
            }
        })
    }

    handleRestorePlantHeath = (pid, life) => {
        this.props.firebase.doRestorePlantHeath(this.props.uid, pid, life);
    }

    handleRemovePlant = pid => {
        this.props.firebase.doRemovePlant(this.props.uid, pid);
    }

    handleCollectPlant = (plant) => {
        let { money, experience, level } = this.state.userData;
        const rate = (plant.life / plant.lifeTime);
        const gain = Math.round((plant.money * 2) * rate);
        money += gain;
        if ((experience + plant.experience) >= 100) {
            experience += plant.experience;
            experience -= 100;
            level++;
        }
        else {
            experience += plant.experience;
        }
        this.handleUpdateUserInformation(money, experience, level);
        this.handleRemovePlant(plant.id);
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

    handleCloseNoti = () => {
        this.setState({ openNoti: false });
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
        const plant = PLANTS.filter((p) => {
            return p.name === this.state.value;
        })
        return (
            <div className="HomePage">
                <div className="UserInfo">
                    <UserInfo name={this.props.displayName || this.props.email} {...this.state.userData} />
                </div>
                <div className="SeedInfo">
                    Choose your seed:
                    <Seed value={this.state.value} onChange={this.handleChangePlant} PLANTS={PLANTS} />
                    <Button variant="contained" onClick={this.handleAddPlant}>Seed</Button>
                </div>
                <div>
                    {`(Cost: ${plant[0].money}$ you will get ${plant[0].experience} experience and ${plant[0].money * 2}$ if plant is full health)`}
                </div>
                <div className="PlantGarden">
                    {
                        this.state.plantData.map((plant, index) => {
                            return <Plant
                                key={index}
                                plant={plant}
                                restoreHeath={this.handleRestorePlantHeath}
                                removePlant={this.handleRemovePlant}
                                collectPlant={this.handleCollectPlant}
                            />
                        })
                    }
                </div>
                <Noti open={this.state.openNoti} handleClose={this.handleCloseNoti} message={this.state.messageNoti} />
            </div>
        );
    }
}

const HomePlant = compose(
    withFirebase,
)(HomePlantBase);

export default HomePage;

export { HomePlant };