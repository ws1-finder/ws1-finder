import { browserService } from "../browser";

export function baseURL() {
    return browserService.getStorage('vmwareOneUrl', 'https://myvmware.workspaceair.com');
}