import { baseURL as _baseURL } from './base_url.js';
import { checkStatus } from './check_status.js';

const entitlementCache = new Map();

function transformToResult(entitlements) {
    return entitlements.map(entitlement => {
        return {
            icon: entitlement._links.icon.href,
            isFavorite: entitlement.favorite,
            key: entitlement.appId,
            name: entitlement.name,
            target: entitlement.launchUrl
        }
    })
};

function mergeBookmarksAndEntitlements(results) {
    const bookmarks = results._embedded.bookmarks;
    const entitlements = results._embedded.entitlements;

    for (const bookmark of bookmarks) {
        const matched = entitlements.findIndex(e => e.appId == bookmark.appId);
        if (matched !== -1) {
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

function get(query, baseURL = _baseURL) {
    if (!entitlementCache.has(query)) {
        return baseURL()
            .then(url => {
                return fetch(`${url}/catalog-portal/services/api/entitlements?${new URLSearchParams({
                    q: query,
                })}`, {
                    credentials: 'include'
                }).then(checkStatus)
                    .then(res => res.json())
                    .then(mergeBookmarksAndEntitlements)
                    .then(filter)
                    .then(transformToResult)
                    .then(result => {
                        entitlementCache.set(query, result)
                        return result;
                    })
            });
    }

    return Promise.resolve(entitlementCache.get(query));
}

export function getEntitlements(query) {
    return get(query)
}