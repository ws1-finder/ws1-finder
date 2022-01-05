import { browserService as _browserService } from "../../browser";
import { getBaseURL, launchURLAndClose } from "./url";

export function getEntitlements(browserService = _browserService) {
    return browserService.getBackgroundPage().getEntitlements()
        .catch(err => {
            getBaseURL().then(url => {
                launchURLAndClose(url)
            });

            reject(err)
        });
}