import Result from "./result";
import { Entitlement } from "./services/extension";

export const EntitlementToResult = (entitlement: Entitlement): Result => {
    return {
        icon: entitlement._links.icon.href,
        isFavorite: entitlement.favorite,
        key: entitlement.appId,
        name: entitlement.name,
        target: entitlement.launchUrl
    };
};

export const EntitlementsToResults = (entitlements: Entitlement[]): Result[] => entitlements.map(EntitlementToResult);
