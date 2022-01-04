import makeBrowserService from "../browser";

export function baseURL() {
    const browserService = makeBrowserService();
    return browserService.getStorage('vmwareOneUrl', 'https://myvmware.workspaceair.com');
}