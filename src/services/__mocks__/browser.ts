import Result from "../../result";
import { BackgroundPageWindow } from "../browser_service";

const makeMockBrowserService = () => {
    const mockResults: Result[] = [];

    return {
        backgroundPage: (): BackgroundPageWindow => {
            return {
                ws1Finder: {
                    baseURL: () => Promise.resolve("https://finder.example.com"),
                    getEntitlements: (): Promise<Result[]> => {
                        return Promise.resolve(mockResults);
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
