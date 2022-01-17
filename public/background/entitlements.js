import { baseURL as _baseURL } from './base_url.js';
import { clear, get as cacheGet } from './cached_response.js';
import { checkStatus } from './check_status.js';

function filter(results) {
    return results._embedded.entitlements.filter(function (entitlement) {
        const links = entitlement._links;
        return ('launch' in links) && !('appLaunchUrls' in links) && !('appLaunchUrlsV2' in links)
    });
}

function sort(results) {
    return results.sort(function (a, b) { return b.favorite - a.favorite });
}

function get(baseURL = _baseURL) {
    return baseURL()
        .then(url => {
            return fetch(url + '/catalog-portal/services/api/entitlements', {
                credentials: 'include'
            }).then(checkStatus)
                .then(res => res.json())
                .then(filter)
                .then(sort)
        });
}

export { clear }

export function getEntitlements() {
    return cacheGet(get)
}