import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";

import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import React, { KeyboardEvent, useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import "./app.css";
import NoResults from "./no_results";
import Result from "./result";
import ResultItem from "./result_item";
import ResultList from "./result_list";
import { launchURLAndClose } from "./services/url_launcher";
import useSearch from "./use_search";
import WorkspaceOneHeader from "./workspace_one_header";

const isError = (obj: unknown): obj is Error => {
    return (
        typeof obj === "object" && obj !== null && "message" in obj
    );
};

function App() {
    const [query, setQuery] = useState("");
    const [cursor, setCursor] = useState(-1);

    const { isLoading, error, data } = useSearch(query);

    const debounced = useDebouncedCallback((value) => {
        setQuery(value);
    }, 250);

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
        if (e.key === "ArrowUp" && cursor > 0) {
            setCursor(cursor - 1);
        } else if (e.key === "ArrowDown" && cursor < (data ?? []).length - 1) {
            setCursor(cursor + 1);
        }
    }, [cursor, data]);

    const handleTextBoxKeyDown = (e: KeyboardEvent<HTMLElement>) => {
        if (e.key === "ArrowDown" && cursor < (data ?? []).length - 1) {
            setCursor(cursor + 1);
        } else if (e.key === "Enter" && data && data.length > 0) {
            launchURLAndClose(data[0].target);
        }
    };

    return (<>
        <WorkspaceOneHeader />

        <TextField
            id="outlined-basic"
            variant="standard"
            onChange={ (e) => debounced(e.target.value) }
            placeholder="Search VMware Workspace One"
            fullWidth
            autoFocus
            onKeyDown={ handleTextBoxKeyDown }
            InputProps={ {
                startAdornment: <SearchIcon />
            } }
            sx={ { mt: "1em" } }
        />

        { isError(error) && <Alert severity="error" >{ error.message }</Alert> }
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
                            onKeyDown={ handleKeyDown }
                        />) }
                    </ResultList>
                ) }
            </>
        ) }
    </>
    );
}

export default App;
