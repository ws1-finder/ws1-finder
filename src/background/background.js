import { baseURL } from './base_url';
let currentResults = null;

function clearCache() {
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
        baseURL().then(url => {
            chrome.tabs.create({ url: url });

            chrome.runtime.sendMessage({
                msg: "close_appfinder_extension"
            });
        })
    }
    return results;
}

function getEntitlements(successCallback) {
    if (currentResults !== null) {
        successCallback(currentResults);
    } else {
        baseURL()
            .then(url => {
                fetch(url + '/catalog-portal/services/api/entitlements', {
                    credentials: 'include'
                }).then(checkAuthenticated)
                    .then(res => res.json())
                    .then(filterResults)
                    .then(sortResults)
                    .then(storeSuccess)
                    .then(successCallback)
            });
    }
}
window.getEntitlements = getEntitlements;
window.baseURL = baseURL;
window.clearCache = clearCache;