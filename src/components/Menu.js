import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MyPlantIcon from '@material-ui/icons/ChangeHistory';
import ThreeSixtyIcon  from '@material-ui/icons/ThreeSixty';
import SignOutButton from './SignOutButton';
import '../styles/Menu.scss';

const Menu = () => {
    return (
        <Drawer
            className="drawer"
            variant="permanent"
            classes={{
                paper: 'drawerPaper',
            }}
            anchor="left"
        >
            <div className="menu">
                <div>
                    <h1>Plant Seeder</h1>
                    <Divider />
                    <List component="nav">
                        <ListItem button component="a" href="#">
                            <ListItemIcon>
                                <MyPlantIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Plant" />
                        </ListItem>
                        <ListItem button component="a" href="#changepassword">
                            <ListItemIcon>
                                <ThreeSixtyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Change Password" />
                        </ListItem>
                    </List>
                </div>
                <SignOutButton />
            </div>
        </Drawer>
    );
};

export default Menu;