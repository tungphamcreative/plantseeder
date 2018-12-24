import React from 'react';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

const UserInfomation = ({name, money, level, experience}) => {
    return (
        <Chip color="primary" icon={<FaceIcon />} label={`${name}; Level: ${level}; Experience: ${experience}/100; Money: ${money}`} />
    );
};

export default UserInfomation;