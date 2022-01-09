const makeBrowserService = (_browser = chrome, _window = window) => {
    const makeOpenOptions = (browser, window) => {
        return () => {
            if (browser.runtime.openOptionsPage) {
                browser.runtime.openOptionsPage();
            } else {
                window.open(browser.runtime.getURL("options.html"));
            }
        };
    };

    const makeWindowClose = (window) => {
        return () => {
            window.close();
        };
    };

    const makeCreateTab = (browser) => {
        return (url) => {
            browser.tabs.create({ url: url });
        };
    };

    const makeBackgroundPage = (browser) => {
        return () => {
            return browser.extension.getBackgroundPage();
        };
    };

    const makeGetStorage = (browser) => {
        return (key, _default) => {
            return new Promise((resolve) => {
                browser.storage.sync.get({ [key]: _default }, (response) => {
                    resolve(response[key]);
                });
            });
        };
    };

    const makeSetStorage = (browser) => {
        return (key, value) => {
            return new Promise((resolve) => {
                browser.storage.sync.set({
                    [key]: value
                }, () => { resolve(); });
            });
        };
    };

    const makeRequestPermissions = (browser) => {
        return (permissions) => {
            return new Promise((resolve) => {
                browser.permissions.request(permissions, (granted) => {
                    resolve(granted);
                });
            });
        };
    };

    return {
        createTab: makeCreateTab(_browser),
        getBackgroundPage: makeBackgroundPage(_browser),
        getStorage: makeGetStorage(_browser),
        openOptions: makeOpenOptions(_browser, _window),
        requestPermissions: makeRequestPermissions(_browser),
        setStorage: makeSetStorage(_browser),
        windowClose: makeWindowClose(_window)
    };
};

export const browserService = makeBrowserService();
export default makeBrowserService;
