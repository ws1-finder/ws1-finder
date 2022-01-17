export function baseURL() {
    return new Promise((resolve) => {
        chrome.storage.sync.get({
            vmwareOneUrl: 'https://myvmware.workspaceair.com'
        }, (response) => { resolve(response.vmwareOneUrl); });
    });
}