import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useEffect, useState } from "react";
import "./App.css";
import { SearchUpdated } from "./extension";
import NoResults from "./no_results";
import Result from "./result";
import ResultItem from "./result_item";
import ResultList from "./result_list";
import { getEntitlements } from "./services/entitlements";
import useSearch from "./use_search";

function App() {
    const [query, setQuery] = useState("");
    const { isLoading, data, error } = useSearch(getEntitlements, query);

    useEffect(() => {
        document.body.addEventListener("searchUpdated", ((event: SearchUpdated) => {
            if (event.detail) setQuery(event.detail.text);
        }));
    }, []);
    return (<>

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
