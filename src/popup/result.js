import React from 'react';
import { handleLaunchURL } from './services/url';
import Star from '@mui/icons-material/Star';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const Result = ({ result }) => {
    return <ListItem>
        <ListItemAvatar>
            <Avatar>
                <img width="40" src={result.icon} />
            </Avatar>
        </ListItemAvatar>
        <ListItemButton onClick={handleLaunchURL(result.target)}>
        <ListItemText primary={result.name} />
        </ListItemButton>
        {result.isFavorite &&
            <ListItemAvatar edge="end">
                <Star className="result-favorite" sx={{ fontSize: 30, fill: "#f2cb2f", stroke: "#f7a430" }} />
            </ListItemAvatar>
        }
    </ListItem>
}

export default Result
