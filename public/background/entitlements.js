import { baseURL as _baseURL } from './base_url.js';
import { clear, get as cacheGet } from './cached_response.js';
import { checkStatus } from './check_status.js';

function mergeBookmarksAndEntitlements(results) {
    const bookmarks = results._embedded.bookmarks;
    const entitlements = results._embedded.entitlements;

    for(const bookmark of bookmarks) {
        const matched = entitlements.findIndex(e => e.appId == bookmark.appId);
        if(matched !== -1) {
            entitlements.splice(matched, 1);
        }
    }

    return bookmarks.concat(entitlements);
}

function filter(results) {
    return results.filter(function (app) {
        const links = app._links;
        return ('launch' in links) && !('appLaunchUrls' in links) && !('appLaunchUrlsV2' in links)
    });
}

function get(baseURL = _baseURL) {
    return baseURL()
        .then(url => {
            return fetch(url + '/catalog-portal/services/api/entitlements', {
                credentials: 'include'
            }).then(checkStatus)
                .then(res => res.json())
                .then(mergeBookmarksAndEntitlements)
                .then(filter)
        });
}

export { clear }

export function getEntitlements() {
    return cacheGet(get)
}