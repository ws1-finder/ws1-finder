import { browserService as _browserService } from "./browser";
import { getBaseURL, launchURLAndClose } from "./url";

export function getEntitlements(browserService = _browserService) {
    return new Promise((resolve, reject) => {
        browserService.getBackgroundPage().onPopupLoad((results: any[]) => {
            resolve(results)
        }, (err: Error) => {

            if (err.message.includes("Unauthenticated")) {
                getBaseURL().then((url: string | unknown) => {
                    if (typeof url === "string") {
                        launchURLAndClose(url)
                    }
                });
            }

            reject(err)
        });
    })
};