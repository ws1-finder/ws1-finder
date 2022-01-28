import browserService, { BrowserService } from  "./browser";
import { authentication } from "./error_handlers";

export interface Entitlement {
    _links: {
        icon: {
            href: string
        }
    }
    favorite: boolean
    appId: string,
    name: string,
    launchUrl: string
}

const makeEntitlements = () => {
    return (_browserService: BrowserService = browserService) => {
        return _browserService.backgroundPage().ws1Finder
            .getEntitlements()
            .catch(authentication);
    };
};

export const baseURL = browserService.backgroundPage().ws1Finder.baseURL;
export const entitlements = makeEntitlements();
