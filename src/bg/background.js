let currentResults = null;

function clearCache() {
    currentResults = null;
}

function storeSuccess(results) {
    if ('_embedded' in results) {
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

function checkAuthenticated(results) {
    if (results.status === 401) {
        baseURL(function (url) {
            chrome.tabs.create({url: url});
        });
    }
    return results;
}

function onPopupLoad(successCallback) {
    if (currentResults !== null) {
        successCallback(currentResults);
    } else {
        baseURL(function (url) {
            fetch(url + '/catalog-portal/services/api/entitlements', {
                credentials: 'include'
            }).then(checkAuthenticated)
                .then(res => res.json())
                .then(filterResults)
                .then(storeSuccess)
                .then(successCallback)
        });
    }
}

function baseURL(success) {
    chrome.storage.sync.get({
        vmwareOneUrl: 'https://myvmware.workspaceair.com'
    }, function(response) {
        success(response.vmwareOneUrl);
    });
}