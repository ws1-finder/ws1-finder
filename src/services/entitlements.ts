import { browserService as _browserService } from "./browser";
import { launchURLAndClose } from "./url_launcher";
import { Entitlement } from "../extension";

export function getEntitlements(browserService = _browserService): Promise<Entitlement[]> {
    return browserService.entitlements().catch((err: Error) => {
        if (err.message.includes("Not authenticated")) {
            browserService.baseURL().then((url: string | unknown) => {
                if (typeof url === "string") {
                    launchURLAndClose(url);
                }
            });
        }
    });
}
