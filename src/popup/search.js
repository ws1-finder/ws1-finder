import React, { useState } from 'react';
import Results from './results';
import { getEntitlements } from './services/entitlements';
import useSearch from './use_search';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Search = () => {
    const [query, setQuery] = useState('');

    const { status, results, error } = useSearch(getEntitlements, query)

    const handleChange = e => {
        const query = e.target.value;

        if (query) {
            setQuery(query)
        }
    };

    return <div>
        <TextField
            id="outlined-basic"
            variant="standard"
            onChange={handleChange}
            placeholder="Search VMware Workspace One"
            fullWidth
            autoFocus
            InputProps={{
                startAdornment: <SearchIcon />
            }}
            sx={{ mt: "1em" }}
        />

        {status === 'idle' && (
            <div>Nothing loaded</div>
        )}
        {status === 'error' && <div>{error}</div>}
        {status === 'fetching' && <CircularProgress />}
        {status === 'fetched' && (
            <>
                {results.length === 0 && <div> No results</div>}
                <Results results={results} />
            </>
        )}
    </div >
}

export default Search
