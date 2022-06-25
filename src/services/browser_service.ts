import { Entitlement } from "./extension";

export interface BackgroundPageWindow {
    ws1Finder: {
        baseURL(): Promise<string>;
        getEntitlements(): Promise<Entitlement[]>;
        clearCache: () => void;
    }
}

export interface BrowserService {
    backgroundPage(): BackgroundPageWindow;
    createTab(url: string): void;
    getStorage(key: string, _default: string): Promise<string>;
    openOptions(): void;
    requestPermissions(permissions: Record<string, unknown>): Promise<boolean>;
    setStorage(key: string, value: string): Promise<void>;
    windowClose(): void;
}
