import { MouseEvent } from "react";
import { browserService as _browserService } from "./browser";

export function launchOptions(e: MouseEvent, browserService = _browserService) {
    e.preventDefault();
    browserService.openOptions();
    return false;
}
