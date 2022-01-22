import { MouseEvent } from "react";
import { BrowserService, browserService as _browserService } from "./browser";

export function launchOptions(e: MouseEvent, browserService: BrowserService = _browserService) {
    e.preventDefault();
    browserService.openOptions();
    return false;
}
