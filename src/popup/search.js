import React, { useState } from 'react';
import Results from './results';
import { getEntitlements } from './services/entitlements';
import useSearch from './use_search';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { launchURLAndClose } from './services/url';

const Search = () => {
    const [query, setQuery] = useState('');

    const { status, results, error } = useSearch(getEntitlements, query)

    const handleChange = e => {
        const query = e.target.value;

        if (query) {
            setQuery(query)
        }
    };

    const handleKeyPress = e => {
        if (e.key === "Enter" && results && results.length > 0) {
            launchURLAndClose(results[0].target)
        }
    };

    const showMessage = (message) => {
        return <Box display="flex" flexDirection="column" sx={{ m: "2em" }}>
            <Chip label={message} variant="outlined" />
        </Box>
    }

    return <div>
        <TextField
            id="outlined-basic"
            variant="standard"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder="Search VMware Workspace One"
            fullWidth
            autoFocus
            InputProps={{
                startAdornment: <SearchIcon />
            }}
            sx={{ mt: "1em" }}
        />

        {status === 'idle' && (
            showMessage("Nothing Loaded")
        )}
        {status === 'error' && <Alert severity="error">{error}</Alert>}
        {status === 'fetching' && <LinearProgress />}
        {status === 'fetched' && (
            <>
                {results.length === 0 && showMessage("No Results Found")}
                <Results results={results} />
            </>
        )}
    </div >
}

export default Search
