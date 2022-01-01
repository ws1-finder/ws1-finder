import { baseURL } from './base_url';

let currentResults = null;

export function clear() {
    currentResults = null;
}

function storeSuccess(results) {
    if (results.length && results.length > 0) {
        currentResults = results;
    } else {
        currentResults = null;
    }
    return results;
}

function filterResults(results) {
    return results._embedded.entitlements.filter(function (entitlement) {
        const links = entitlement._links;
        return ('launch' in links) && !('appLaunchUrls' in links) && !('appLaunchUrlsV2' in links)
    });
}

function sortResults(results) {
    return results.sort(function (a, b) { return b.favorite - a.favorite });
}

function checkAuthenticated(results) {
    if (results.status === 401) {
        throw Error('Not authenticated');
    }
    return results;
}

export function getEntitlements() {
    if (currentResults !== null) {
        return Promise.resolve(currentResults);
    } else {
        return baseURL()
            .then(url => {
                return fetch(url + '/catalog-portal/services/api/entitlements', {
                    credentials: 'include'
                }).then(checkAuthenticated)
                    .then(res => res.json())
                    .then(filterResults)
                    .then(sortResults)
                    .then(storeSuccess)
            });
    }
}
