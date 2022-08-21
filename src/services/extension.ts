import browserService from  "./browser";
import { BrowserService } from "./browser_service";
import { authentication } from "./error_handlers";

const makeEntitlements = () => {
    return (query: string, _browserService: BrowserService = browserService) => {
        return _browserService.backgroundPage().ws1Finder
            .getEntitlements(query)
            .catch(authentication);
    };
};

export const baseURL = browserService.backgroundPage().ws1Finder.baseURL;
export const prereleaseMarker = browserService.getPrereleaseMarker();
export const entitlements = makeEntitlements();
