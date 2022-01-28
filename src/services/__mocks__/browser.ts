import { BackgroundPageWindow } from "../browser";
import { Entitlement } from "../extension";

const makeMockBrowserService = () => {
    return {
        backgroundPage: (): BackgroundPageWindow => {
            return {
                ws1Finder: {
                    baseURL: () => Promise.resolve("https://finder.example.com"),
                    clearCache: (): void => {},
                    getEntitlements: (): Promise<Entitlement[]> => {
                        return Promise.resolve([]);
                    }
                }
            };
        },
        createTab: () => { },
        getStorage: (_k: string, _default: string) => {
            return Promise.resolve(_default);
        },
        openOptions: () => {
        },
        requestPermissions: () => {
            return Promise.resolve(true);
        },
        setStorage: () => {
            return Promise.resolve();
        },
        windowClose: () => {
        }
    };
};

const browserService = makeMockBrowserService();

export default browserService;
