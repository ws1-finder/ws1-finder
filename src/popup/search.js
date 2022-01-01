import React, { useEffect, useState } from 'react';
import Result from './result';
import { getEntitlements } from './services/entitlements';

const Search = () => {
    const [entitlements, setEntitlements] = useState([]);
    const [searchField, setSearchField] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let mounted = true;
        getEntitlements()
            .then(items => {
                if (mounted) {
                    setEntitlements(items)
                }
            })
            .catch(err => {
                setErrorMessage(err);
            });
        return () => mounted = false;
    }, [])

    const filteredEntitlements = entitlements.filter(
        entitlement => {
            return (
                entitlement
                    .name
                    .toLowerCase()
                    .includes(searchField.toLowerCase())
            );
        }
    );

    const handleChange = e => {
        setSearchField(e.target.value);
    };


    return <div>
        <form autoComplete="off">
            <input type="search" id="appSearch" placeholder="Search Workspace ONE" onChange={handleChange} autoFocus />
        </form>

        <table id="results">
            <tbody>
                {filteredEntitlements.map(entitlement => <Result icon={entitlement._links.icon.href} target={entitlement._links.launch.href} name={entitlement.name} isFavorite={entitlement.favorite} key={entitlement.appId} />)}
            </tbody>
        </table>
        {errorMessage && (
            <p className="error"> {errorMessage} </p>
        )}
    </div >
}

export default Search
