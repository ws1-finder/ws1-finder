import { baseURL as _baseURL } from './base_url';
import { clear, get as cacheGet } from './cached_response';

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

function checkOk(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response;
}

function get(baseURL = _baseURL) {
    return baseURL()
        .then(url => {
            return fetch(url + '/catalog-portal/services/api/entitlements', {
                credentials: 'include'
            }).then(checkAuthenticated)
                .then(checkOk)
                .then(res => res.json())
                .then(filterResults)
                .then(sortResults)
        });
}

export { clear }

export function getEntitlements() {
    return cacheGet(get)
}