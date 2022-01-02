export const EntitlementToResult = (entitlement) => {
    return {
        icon: entitlement._links.icon.href,
        target: entitlement._links.launch.href,
        name: entitlement.name,
        isFavorite: entitlement.favorite,
        key: entitlement.appId

    }
}

export const EntitlementsToResults = (entitlements) => entitlements.map(EntitlementToResult);