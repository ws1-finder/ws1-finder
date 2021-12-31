import { getBaseURL } from "./url";

export function getEntitlements(backgroundPage = chrome.extension.getBackgroundPage()) {
    return backgroundPage.getEntitlements()
        .catch(err => {
            getBaseURL().then(url => {
                chrome.tabs.create({ url: url });
                window.close()
            });

            reject(err)
        });
}