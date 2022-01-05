const makeBrowserService = () => {
    const browser = chrome;
    const _window = window;

    const makeOpenOptions = (browser, window) => {
        return () => {
            if (browser.runtime.openOptionsPage) {
                browser.runtime.openOptionsPage();
            } else {
                window.open(browser.runtime.getURL('options.html'));
            }
        }
    }

    const makeWindowClose = (browser, window) => {
        return () => {
            window.close();
        }
    }

    const makeCreateTab = (browser) => {
        return (url) => {
            browser.tabs.create({ url: url })
        }
    }

    const makeBackgroundPage = (browser) => {
        return () => {
            return browser.extension.getBackgroundPage();
        }
    }

    const makeGetStorage = (browser) => {
        return (key, _default) => {
            return new Promise((resolve, reject) => {
                browser.storage.sync.get({ [key]: _default }, (response) => {
                    resolve(response[key]);
                });
            });
        }
    }

    const makeSetStorage = (browser) => {
        return (key, value) => {
            return new Promise((resolve, reject) => {
                browser.storage.sync.set({
                    [key]: value
                }, () => { resolve(); })
            });
        }
    }

    const makeRequestPermissions = (browser) => {
        return (permissions) => {
            return new Promise((resolve, reject) => {
                browser.permissions.request(permissions, (granted) => {
                    resolve(granted);
                });
            });
        }
    }

    return {
        getStorage: makeGetStorage(browser),
        setStorage: makeSetStorage(browser),
        requestPermissions: makeRequestPermissions(browser),
        getBackgroundPage: makeBackgroundPage(browser),
        createTab: makeCreateTab(browser),
        windowClose: makeWindowClose(browser, _window),
        openOptions: makeOpenOptions(browser, _window)
    }
}

export const browserService = makeBrowserService();
export default makeBrowserService