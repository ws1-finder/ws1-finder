import { browserService as _browserService } from "./browser";
import { getBaseURL, launchURLAndClose } from "./url";
import { Entitlement } from "../extension";

export function getEntitlements(browserService = _browserService): Promise<Entitlement[]> {
    return browserService.getBackgroundPage().ws1Finder.getEntitlements().catch((err: Error) => {
        if (err.message.includes("Not authenticated")) {
            getBaseURL().then((url: string | unknown) => {
                if (typeof url === "string") {
                    launchURLAndClose(url);
                }
            });
        }
    });
}
