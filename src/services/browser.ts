import { BackgroundPageWindow, BrowserService } from "./browser_service";
import { makeFakeBrowserService } from "./fake_browser_service";


interface windowWithBrowser extends Window {
    browser: typeof chrome
}

const hasBrowser = (obj: unknown): obj is windowWithBrowser => {
    return (
        typeof obj === "object" && obj !== null && "browser" in obj
    );
};

function getBrowserInstance(): typeof chrome {
    let browserInstance = window.chrome;
    
    if(!browserInstance && hasBrowser(window)) {
        browserInstance = window.browser;
    }

    return browserInstance;
}

const makeBrowserService = (
    _browser: typeof chrome,
    _window: Window): BrowserService => {

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

            return bgPage as unknown as BackgroundPageWindow;
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
        return (permissions: Record<string, unknown>) => {
            return new Promise<boolean>((resolve) => {
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

const browserInstance = getBrowserInstance();
let browserService: BrowserService;

if (!(browserInstance && browserInstance.runtime && browserInstance.runtime.id)) {
    browserService = makeFakeBrowserService(window);
} else {
    browserService = makeBrowserService(browserInstance, window);
}

export default browserService;
