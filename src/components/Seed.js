import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import '../styles/Seed.scss';
const Seed = ({ PLANTS, value, onChange }) => {
    return (
        <Select
            value={value}
            onChange={onChange}
            name="seed"
            className="seedBox"
        >
            {
                PLANTS.map((p, index) => {
                    return <MenuItem key={index} value={p.name}>{p.name}</MenuItem>
                })
            }
        </Select>
    );
};

export default Seed;