import { BackgroundPageWindow } from "../browser_service";
import { Entitlement } from "../extension";

const makeMockBrowserService = () => {
    const mockEntitlements: Entitlement[] = [];

    return {
        backgroundPage: (): BackgroundPageWindow => {
            return {
                ws1Finder: {
                    baseURL: () => Promise.resolve("https://finder.example.com"),
                    clearCache: (): void => undefined,
                    getEntitlements: (): Promise<Entitlement[]> => {
                        return Promise.resolve(mockEntitlements);
                    }
                }
            };
        },
        createTab: () => undefined,
        getStorage: (_k: string, _default: string) => {
            return Promise.resolve(_default);
        },
        openOptions: () => undefined,
        requestPermissions: () => {
            return Promise.resolve(true);
        },
        setStorage: () => {
            return Promise.resolve();
        },
        windowClose: () => undefined
    };
};

const browserService = makeMockBrowserService();

export default browserService;
