import { baseURL } from './base_url.js';
import { clear, getEntitlements } from './entitlements.js';

window.ws1Finder = {
    getEntitlements: getEntitlements,
    baseURL: baseURL,
    clearCache: clear
}