import Star from "@mui/icons-material/Star";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import React from "react";

const FavoriteAvatar = () => {
    return <ListItemAvatar>
        <Star
            className="result-favorite"
            sx={ { fill: "#f2cb2f", fontSize: 30, stroke: "#f7a430" } }
        />
    </ListItemAvatar>;
};

export default FavoriteAvatar;
