export function launchURL(e) {
    if (e.preventDefault) {
        e.preventDefault();
        chrome.tabs.create({ url: e.target.href });
    } else {
        chrome.tabs.create({ url: e });
    }
}

export function getBaseURL(backgroundPage = chrome.extension.getBackgroundPage()) {
    return new Promise((resolve, reject) => {
        backgroundPage.baseURL(function (url) {
            resolve(url);
        });
    });
}