import type { ListItemButtonProps } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { createRef, useEffect } from "react";
import FavoriteAvatar from "./favorite_avatar";
import Result from "./result";
import ResultAvatar from "./result_avatar";
import { handleLaunchURLAndClose } from "./services/url_launcher";

type ResultItemType = {
    result: Result;
    selected: boolean;
} & ListItemButtonProps;

const ResultItem = ({ selected, result, ...otherProps }: ResultItemType) => {
    const listItem = createRef<HTMLInputElement>();

    useEffect(() => {
        if(selected && listItem.current) {
            listItem.current.focus();
        }
    }, [selected, listItem]);

    return <ListItemButton 
        ref={ listItem } 
        onClick={ handleLaunchURLAndClose(result.target) } 
        { ...otherProps } 
        divider>
        <ResultAvatar iconURL={ result.icon } name={ result.name } />
        <ListItemText primary={ result.name } />
        { result.isFavorite && <FavoriteAvatar /> }
    </ListItemButton>;
};

export default ResultItem;
