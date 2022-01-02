import React, { useState } from 'react';
import Result from './result';
import { getEntitlements } from './services/entitlements';
import  useSearch from './use_search';

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
        <form autoComplete="off">
            <input type="search" id="appSearch" placeholder="Search Workspace ONE" onChange={handleChange} autoFocus />
        </form>

        {status === 'idle' && (
            <div>Nothing loaded</div>
        )}
        {status === 'error' && <div>{error}</div>}
        {status === 'fetching' && <div className="loading"></div>}
        {status === 'fetched' && (
            <>
                {results.length === 0 && <div> No results</div>}
                <table id="results">
                    <tbody>
                {results.map((result) => (
                    <Result result={result} key={result.key} /> 
                ))}
                </tbody>
                </table>
            </>
        )}
    </div >
}

export default Search
