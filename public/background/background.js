import { baseURL } from './base_url.js';
import { clear as entitlementsClear, getEntitlements } from './entitlements.js';
import { clear as personalBookmarksClear, getPersonalBookmarks } from './personal_bookmarks.js';

window.ws1Finder = {
    getEntitlements: getEntitlements,
    getPersonalBookmarks: getPersonalBookmarks,
    baseURL: baseURL,
    clearCache: () => {
        entitlementsClear();
        personalBookmarksClear();
    }   
}