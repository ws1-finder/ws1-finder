import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import FavoriteAvatar from "./favorite_avatar";
import Result from "./result";
import ResultAvatar from "./result_avatar";
import { handleLaunchURLAndClose } from "./services/url";

const ResultItem = ({ result }: { result: Result }) => {
    return <ListItem onClick={ handleLaunchURLAndClose(result.target) } button divider>
        <ResultAvatar iconURL={ result.icon } name={ result.name } />
        <ListItemText primary={ result.name } />
        { result.isFavorite && <FavoriteAvatar /> }
    </ListItem>;
};

export default ResultItem;
