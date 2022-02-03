import { MouseEvent } from "react";
import _browserService from "./browser";
import { BrowserService } from "./browser_service";

export function launchOptions(e: MouseEvent, browserService: BrowserService = _browserService) {
    e.preventDefault();
    browserService.openOptions();
    return false;
}
