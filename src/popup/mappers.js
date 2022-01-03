export const EntitlementToResult = (entitlement) => {
    return {
        icon: entitlement._links.icon.href,
        target: entitlement.launchUrl,
        name: entitlement.name,
        isFavorite: entitlement.favorite,
        key: entitlement.appId

    }
}

export const EntitlementsToResults = (entitlements) => entitlements.map(EntitlementToResult);