import { Entitlement } from "./extension";

function getBrowserInstance(): typeof chrome {
    const browserInstance = window.chrome || (window as any)["browser"];
    return browserInstance;
}

export interface BackgroundPageWindow extends Window {
    ws1Finder: {
        baseURL(): Promise<string>;
        getEntitlements(): Promise<Entitlement[]>;
        clearCache: () => void;
    }
}

const makeBrowserService = (_browser: typeof chrome = getBrowserInstance(), _window: Window = window) => {

    const makeOpenOptions = (browser: typeof chrome, window: Window) => {
        return () => {
            if (browser.runtime.openOptionsPage) {
                browser.runtime.openOptionsPage();
            } else {
                window.open(browser.runtime.getURL("options.html"));
            }
        };
    };

    const makeWindowClose = (window: Window) => {
        return () => {
            window.close();
        };
    };

    const makeCreateTab = (browser: typeof chrome) => {
        return (url: string) => {
            browser.tabs.create({ url: url });
        };
    };

    const makeBackgroundPage = (browser: typeof chrome) => {
        return (): BackgroundPageWindow => {
            const bgPage = browser.extension.getBackgroundPage();
            if (bgPage === null) {
                throw new Error("Background page not found");
            }

            return bgPage as BackgroundPageWindow;
        };
    };

    const makeGetStorage = (browser: typeof chrome) => {
        return (key: string, _default: string) => {
            return new Promise<string>((resolve) => {
                browser.storage.sync.get({ [key]: _default }, (response) => {
                    resolve(response[key]);
                });
            });
        };
    };

    const makeSetStorage = (browser: typeof chrome) => {
        return (key: string, value: string) => {
            return new Promise<void>(resolve => {
                browser.storage.sync.set({
                    [key]: value
                }, () => { resolve(); });
            });
        };
    };

    const makeRequestPermissions = (browser: typeof chrome) => {
        return (permissions: {}) => {
            return new Promise((resolve) => {
                browser.permissions.request(permissions, (granted) => {
                    resolve(granted);
                });
            });
        };
    };

    return {
        backgroundPage: makeBackgroundPage(_browser),
        createTab: makeCreateTab(_browser),
        getStorage: makeGetStorage(_browser),
        openOptions: makeOpenOptions(_browser, _window),
        requestPermissions: makeRequestPermissions(_browser),
        setStorage: makeSetStorage(_browser),
        windowClose: makeWindowClose(_window)
    };
};

export const browserService = makeBrowserService();
export default makeBrowserService;
