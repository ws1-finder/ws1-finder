import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import React from "react";

const ResultAvatar = ({ iconURL, name } : { iconURL: string, name: string }) => {
    return <ListItemAvatar>
        <Avatar>
            <img width="40" src={ iconURL } alt={ `${name} icon` } />
        </Avatar>
    </ListItemAvatar>;
};

export default ResultAvatar;
