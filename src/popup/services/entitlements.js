import { getBaseURL, launchURLAndClose } from "./url";

export function getEntitlements(backgroundPage = chrome.extension.getBackgroundPage()) {
    return backgroundPage.getEntitlements()
        .catch(err => {
            getBaseURL().then(url => {
                launchURLAndClose(url)
            });

            reject(err)
        });
}