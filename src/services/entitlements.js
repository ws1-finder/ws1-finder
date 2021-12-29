export function getEntitlements(backgroundPage = chrome.extension.getBackgroundPage()) {
    return new Promise((resolve, reject) => {
        backgroundPage.onPopupLoad((entitlements) => {
            resolve(entitlements);
        });
    });
}