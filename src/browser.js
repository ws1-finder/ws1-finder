const makeBrowserService = () => {
    const browser = chrome;

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
        requestPermissions: makeRequestPermissions(browser)
    }
}

export const browserService = makeBrowserService();
export default makeBrowserService