import { browserService as _browserService } from "./browser";
import { getBaseURL, launchURLAndClose } from "./url";
import { Entitlement } from "../extension";

export function getEntitlements(browserService = _browserService): Promise<Entitlement[]> {
    return new Promise<Entitlement[]>((resolve, reject) => {
        browserService.getBackgroundPage().onPopupLoad((results: Entitlement[]) => {
            resolve(results);
        }, (err: Error) => {

            if (err.message.includes("Unauthenticated")) {
                getBaseURL().then((url: string | unknown) => {
                    if (typeof url === "string") {
                        launchURLAndClose(url);
                    }
                });
            }

            reject(err);
        });
    });
}
