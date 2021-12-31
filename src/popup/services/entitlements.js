export function getEntitlements(backgroundPage = chrome.extension.getBackgroundPage()) {
    return new Promise((resolve, reject) => {
        backgroundPage.getEntitlements((entitlements) => {
            resolve(entitlements);
        });
    });
}