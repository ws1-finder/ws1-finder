import { MouseEvent } from "react";
import _browserService, { BrowserService  } from "./browser";

export function launchOptions(e: MouseEvent, browserService: BrowserService = _browserService) {
    e.preventDefault();
    browserService.openOptions();
    return false;
}
