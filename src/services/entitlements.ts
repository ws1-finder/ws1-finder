import { Entitlement, baseURL, entitlements } from "./extension";
import { launchURLAndClose } from "./url_launcher";

export function getEntitlements(): Promise<Entitlement[]> {
    return entitlements().catch((err: Error) => {
        if (err.message.includes("Not authenticated")) {
            baseURL().then((url: string | unknown) => {
                if (typeof url === "string") {
                    launchURLAndClose(url);
                }
            });
        }
    });
}
