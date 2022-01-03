import React, { useEffect, useState } from 'react';
import { launchURL, getBaseURL } from './services/url';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';


const WorkspaceOneHeader = () => {
    const [baseURL, setBaseURL] = useState("https://www.vmware.com/products/workspace-one.html");

    useEffect(() => {
        let mounted = true;
        getBaseURL()
            .then(url => {
                if (mounted) {
                    setBaseURL(url)
                }
            })
        return () => mounted = false;
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link underline="none" color="inherit" href={baseURL} onClick={launchURL}>
                            Workspace One Finder
                        </Link>
                    </Typography>
                    <Avatar alt="Workspace One Finder" src="/css/white-bg-icon.png" />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default WorkspaceOneHeader