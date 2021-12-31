export function launchURL(e) {
    if (e.preventDefault) {
        e.preventDefault();
        chrome.tabs.create({ url: e.target.href });
    } else {
        chrome.tabs.create({ url: e });
    }
}