import Result from "../../result";
import { BackgroundPageWindow } from "../browser_service";

const makeMockBrowserService = () => {
    const mockResults: Result[] = [];
    const mockBookmarks: Result[] = [];

    return {
        backgroundPage: (): BackgroundPageWindow => {
            return {
                ws1Finder: {
                    baseURL: () => Promise.resolve("https://finder.example.com"),
                    clearCache: (): void => undefined,
                    getEntitlements: (): Promise<Result[]> => {
                        return Promise.resolve(mockResults);
                    },
                    getPersonalBookmarks: (): Promise<Result[]> => {
                        return Promise.resolve(mockBookmarks);
                    }
                }
            };
        },
        createTab: () => undefined,
        getPrereleaseMarker: (): string => {
            return "0.0.0-test";
        },
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
