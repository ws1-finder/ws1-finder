import Result from "./result";

export const EntitlementToResult = (entitlement: any): Result => {
    return {
        icon: entitlement._links.icon.href,
        target: entitlement.launchUrl,
        name: entitlement.name,
        isFavorite: entitlement.favorite,
        key: entitlement.appId

    }
}

export const EntitlementsToResults = (entitlements: any[]): Result[] => entitlements.map(EntitlementToResult);