import { baseURL as _baseURL } from './base_url';
import { clear, get as cacheGet } from './cached_response';
import { checkStatus } from './check_status';

function filterResults(results) {
    return results._embedded.entitlements.filter(function (entitlement) {
        const links = entitlement._links;
        return ('launch' in links) && !('appLaunchUrls' in links) && !('appLaunchUrlsV2' in links)
    });
}

function sortResults(results) {
    return results.sort(function (a, b) { return b.favorite - a.favorite });
}

function get(baseURL = _baseURL) {
    return baseURL()
        .then(url => {
            return fetch(url + '/catalog-portal/services/api/entitlements', {
                credentials: 'include'
            }).then(checkStatus)
                .then(res => res.json())
                .then(filterResults)
                .then(sortResults)
        });
}

export { clear }

export function getEntitlements() {
    return cacheGet(get)
}