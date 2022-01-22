import { MouseEvent } from "react";
import { BrowserService, browserService as _browserService } from "./browser";

export function handleLaunchURLAndClose(url: string, browserService: BrowserService = _browserService) {
    return () => {
        browserService.createTab(url);
        browserService.windowClose();
    };
}

export function launchURL(e: MouseEvent | Event | string, browserService: BrowserService = _browserService) {
    if (typeof e === "string") {
        browserService.createTab(e);
    } else if (e.target instanceof HTMLAnchorElement ) {
        e.preventDefault();
        browserService.createTab(e.target.href);
    }
}
export function launchURLAndClose(e: Event | string, browserService: BrowserService = _browserService) {
    launchURL(e);
    browserService.windowClose();
}

