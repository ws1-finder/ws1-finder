import { MouseEvent } from "react";
import browserService  from "./browser";
import { BrowserService } from "./browser_service";

export function handleLaunchURLAndClose(url: string, _browserService: BrowserService = browserService) {
    return () => {
        _browserService.createTab(url);
        _browserService.windowClose();
    };
}

export function launchURL(e: MouseEvent | Event | string, _browserService: BrowserService = browserService) {
    if (typeof e === "string") {
        _browserService.createTab(e);
    } else if (e.target instanceof HTMLAnchorElement ) {
        e.preventDefault();
        _browserService.createTab(e.target.href);
    }
}
export function launchURLAndClose(e: Event | string, _browserService: BrowserService = browserService) {
    launchURL(e);
    _browserService.windowClose();
}

