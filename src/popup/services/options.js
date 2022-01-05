import { browserService as _browserService } from "../../browser";

export function launchOptions(e, browserService = _browserService) {
    e.preventDefault();
    browserService.openOptions();
    return false;
};