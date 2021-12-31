export function launchURL(e) {
    if (e.preventDefault) {
        e.preventDefault();
        chrome.tabs.create({ url: e.target.href });
    } else {
        chrome.tabs.create({ url: e });
    }
}
export function launchURLAndClose(e) {
    launchURL(e)
    window.close();
}

export function getBaseURL(backgroundPage = chrome.extension.getBackgroundPage()) {
    return backgroundPage.baseURL()
}