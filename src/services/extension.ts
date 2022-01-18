import { browserService } from  "./browser";
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

export interface SearchUpdated extends Event {
    detail?: {
        text: string;
    }
}

const makeEntitlements = () => {
    return () => {
        return browserService.backgroundPage().ws1Finder
            .getEntitlements()
            .catch(authentication);
    };
};

export const baseURL = browserService.backgroundPage().ws1Finder.baseURL;
export const entitlements = makeEntitlements();
