import Star from "@mui/icons-material/Star";
import { ListItemText } from "@mui/material";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useEffect, useState } from "react";
import "./App.css";
import { SearchUpdated } from "./extension";
import Result from "./result";
import { getEntitlements } from "./services/entitlements";
import { handleLaunchURLAndClose } from "./services/url";
import useSearch from "./use_search";

const showMessage = (message: string) => {
    return <Box display="flex" flexDirection="column" sx={ { m: "2em" } }>
        <Chip label={ message } variant="outlined" />
    </Box>;
};

function App() {
    const [query, setQuery] = useState("");
    const { isLoading, data, error } = useSearch(getEntitlements, query);

    useEffect(() => {
        document.body.addEventListener("searchUpdated", ((event: SearchUpdated) => {
            if(event.detail) setQuery(event.detail.text);
        }));
    }, []);
    return (<>

        { error !== undefined && <Alert severity="error">{ error }</Alert> }
        { isLoading && <LinearProgress /> }
        { !isLoading && (
            <>
                { data && data.length === 0 && showMessage("No results") }
                { (data !== undefined && data.length > 0) && (
                    <List id="results"
                        sx={ {
                            maxHeight: "300px",
                            overflow: "auto",
                            position: "relative",
                            width: "100%"
                        } }
                    >
                        { data.map((r: Result, index: number) => (
                            <React.Fragment key={ r.key }>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <img width="40" src={ r.icon } alt={ `${r.name} icon` } />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemButton onClick={ handleLaunchURLAndClose(r.target) }>
                                        <ListItemText primary={ r.name } />
                                    </ListItemButton>
                                    { r.isFavorite &&
                                        <ListItemAvatar>
                                            <Star
                                                className="result-favorite"
                                                sx={ { fill: "#f2cb2f", fontSize: 30, stroke: "#f7a430" } }
                                            />
                                        </ListItemAvatar>
                                    }
                                </ListItem>
                                { (index < data.length - 1) ? <Divider variant="inset" component="li" /> : null }
                            </React.Fragment>
                        )) }
                    </List>
                ) }
            </>
        ) }
    </>
    );
}

export default App;
