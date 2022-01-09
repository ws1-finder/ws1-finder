import { browserService as _browserService } from "./browser";

export function handleLaunchURLAndClose(url: string, browserService = _browserService) {
    return () => {
        browserService.createTab(url);
        browserService.windowClose();
    };
}

export function launchURL(e: Event | string, browserService = _browserService) {
    if (typeof e === "string") {
        browserService.createTab(e);
    } else if (e.target instanceof HTMLAnchorElement ) {
        e.preventDefault();
        browserService.createTab(e.target.href);
    }
}
export function launchURLAndClose(e: Event | string, browserService = _browserService) {
    launchURL(e);
    browserService.windowClose();
}

export function getBaseURL(browserService = _browserService) {
    return new Promise((resolve) => {
        browserService.getBackgroundPage().baseURL((url: string) => {
            resolve(url);
        });
    });
}
