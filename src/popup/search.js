import React, { useState } from 'react';
import Results from './results';
import { getEntitlements } from './services/entitlements';
import useSearch from './use_search';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const Search = () => {
    const [query, setQuery] = useState('');

    const { status, results, error } = useSearch(getEntitlements, query)

    const handleChange = e => {
        const query = e.target.value;

        if (query) {
            setQuery(query)
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
        {status === 'fetching' && <CircularProgress />}
        {status === 'fetched' && (
            <>
                {results.length === 0 && showMessage("No Results Found")}
                <Results results={results} />
            </>
        )}
    </div >
}

export default Search
