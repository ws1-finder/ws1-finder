import { baseURL } from './base_url';
import { clear, getEntitlements } from './entitlements';
window.getEntitlements = getEntitlements;
window.baseURL = baseURL;
window.clear = clear;