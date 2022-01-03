import React from 'react';
import { launchOptions } from "./services/options"
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

const Options = () => {
    return <IconButton component="a" onClick={launchOptions}
        size="small"
        edge="start"
        color="inherit"
        aria-label="link"
        sx={{ mr: 2 }}
    >
        <SettingsIcon />
    </IconButton>
}

export default Options