interface Entitlement {
    _links: {
        icon: {
            href: string
        }
    }
    favorite: boolean
    appId: string,
    name: string,
    launchUrl: string
}

export default Entitlement;
