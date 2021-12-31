export function baseURL() {
    return new Promise((resolve, _reject) => {
        chrome.storage.sync.get({
            vmwareOneUrl: 'https://myvmware.workspaceair.com'
        }, function (response) {
            resolve(response.vmwareOneUrl);
        });
    })
}