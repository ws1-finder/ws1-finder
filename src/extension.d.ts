export interface Entitlement {
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

export interface SearchUpdated extends Event {
    detail?: {
        text: string;
    }
}
