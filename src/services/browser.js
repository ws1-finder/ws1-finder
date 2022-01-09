/*global chrome */

const makeBrowserService = (_browser = chrome, _window = window) => {
    const makeOpenOptions = (browser, window) => {
        return () => {
            if (browser.runtime.openOptionsPage) {
                browser.runtime.openOptionsPage();
            } else {
                window.open(browser.runtime.getURL('options.html'));
            }
        }
    }

    const makeWindowClose = (window) => {
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
        getStorage: makeGetStorage(_browser),
        setStorage: makeSetStorage(_browser),
        requestPermissions: makeRequestPermissions(_browser),
        getBackgroundPage: makeBackgroundPage(_browser),
        createTab: makeCreateTab(_browser),
        windowClose: makeWindowClose(_window),
        openOptions: makeOpenOptions(_browser, _window)
    }
}

export const browserService = makeBrowserService();
export default makeBrowserService