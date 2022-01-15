import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import "./App.css";
import { SearchUpdated } from "./extension";
import NoResults from "./no_results";
import Result from "./result";
import ResultItem from "./result_item";
import ResultList from "./result_list";
import { getEntitlements } from "./services/entitlements";
import { launchURLAndClose } from "./services/url";
import useSearch from "./use_search";
import WorkspaceOneHeader from "./workspace_one_header";

function App() {
    const [query, setQuery] = useState("");
    const { isLoading, data, error } = useSearch(getEntitlements, query);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;

        if (query) {
            setQuery(query);
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && data && data.length > 0) {
            launchURLAndClose(data[0].target);
        }
    };

    useEffect(() => {
        document.body.addEventListener("searchUpdated", ((event: SearchUpdated) => {
            if (event.detail) setQuery(event.detail.text);
        }));
    }, []);
    return (<>
        <WorkspaceOneHeader />
        <TextField
            id="outlined-basic"
            variant="standard"
            onChange={ handleChange }
            onKeyDown={ handleKeyPress }
            placeholder="Search VMware Workspace One"
            fullWidth
            autoFocus
            InputProps={ {
                startAdornment: <SearchIcon />
            } }
            sx={ { mt: "1em" } }
        />
        
        { error !== undefined && <Alert severity="error">{ error }</Alert> }
        { isLoading && <LinearProgress /> }
        { !isLoading && (
            <>
                { data && data.length === 0 && <NoResults /> }
                { (data !== undefined && data.length > 0) && (
                    <ResultList>
                        { data.map((r: Result) => <ResultItem key={ r.key } result={ r } />) }
                    </ResultList>
                ) }
            </>
        ) }
    </>
    );
}

export default App;
