import { baseURL as _baseURL } from './base_url.js';
import { clear, get as cacheGet } from './cached_response.js';
import { checkStatus } from './check_status.js';

function transformToResult(entitlements) {
    entitlements.map(entitlement => {
        return {
            icon: entitlement._links.icon.href,
            isFavorite: false,
            key: entitlement.id,
            name: entitlement.name,
            target: entitlement.link
        }
    })
};

function get(baseURL = _baseURL) {
    return baseURL()
        .then(url => {
            return fetch(url + '/catalog-portal/services/api/personalBookmarks', {
                credentials: 'include'
            }).then(checkStatus)
                .then(res => res.json())
                .then(transformToResult)
        });
}

export { clear }

export function getEntitlements() {
    return cacheGet(get)
}