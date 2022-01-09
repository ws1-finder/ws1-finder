import Result from "./result";

export const EntitlementToResult = (entitlement: any): Result => {
    return {
        icon: entitlement._links.icon.href,
        isFavorite: entitlement.favorite,
        key: entitlement.appId,
        name: entitlement.name,
        target: entitlement.launchUrl
    };
};

export const EntitlementsToResults = (entitlements: any[]): Result[] => entitlements.map(EntitlementToResult);
