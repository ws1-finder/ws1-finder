import { baseURL } from './base_url.js';
import { getEntitlements } from './entitlements.js';

window.ws1Finder = {
    getEntitlements: getEntitlements,
    baseURL: baseURL,
}