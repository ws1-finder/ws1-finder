import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import React, { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from "react";
import "./app.css";
import NoResults from "./no_results";
import Result from "./result";
import ResultItem from "./result_item";
import ResultList from "./result_list";
import { SearchUpdated, entitlements } from "./services/extension";
import { launchURLAndClose } from "./services/url_launcher";
import useSearch from "./use_search";
import WorkspaceOneHeader from "./workspace_one_header";

function App() {
    const [query, setQuery] = useState("");
    const [cursor, setCursor] = useState(-1);
    const { isLoading, data, error } = useSearch(entitlements, query);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;

        if (query) {
            setQuery(query);
        }
    };

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
        if (e.key === "ArrowUp" && cursor > 0) {
            setCursor(cursor - 1);
        } else if (e.key === "ArrowDown" && cursor < (data ?? []).length - 1) {
            setCursor(cursor + 1);
        } else if (e.key === "Enter" && data && data.length > 0) {
            launchURLAndClose(data[0].target);
        }
    }, [cursor, data]);

    useEffect(() => {
        document.body.addEventListener("searchUpdated", ((event: SearchUpdated) => {
            if (event.detail) setQuery(event.detail.text);
        }));
    }, []);
    return (<>
        <WorkspaceOneHeader />

        <TextField
            id="outlined-basic"
            role="searchbox"
            variant="standard"
            onChange={ handleChange }
            placeholder="Search VMware Workspace One"
            fullWidth
            autoFocus
            onKeyDown={ handleKeyDown }
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
                        { data.map((r: Result, i: number) => <ResultItem
                            selected={ i === cursor }
                            key={ r.key }
                            result={ r }
                            onKeyDown= { handleKeyDown }
                        />) }
                    </ResultList>
                ) }
            </>
        ) }
    </>
    );
}

export default App;
