import { browserService as _browserService } from "../../browser";

export function handleLaunchURLAndClose(url, browserService = _browserService) {
    return () => {
        browserService.createTab(url)
        browserService.windowClose();
    }
}

export function launchURL(e, browserService = _browserService) {
    if (e.preventDefault) {
        e.preventDefault();

        browserService.createTab(e.target.href);
    } else {
        browserService.createTab(e);
    }
}
export function launchURLAndClose(e, browserService = _browserService) {
    launchURL(e)
    browserService.windowClose();
}

export function getBaseURL(browserService = _browserService) {
    return browserService.getBackgroundPage().baseURL()
}