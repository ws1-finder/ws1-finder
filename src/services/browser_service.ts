import Result from "../result";

export interface BackgroundPageWindow {
    ws1Finder: {
        baseURL(): Promise<string>;
        getEntitlements(query: string): Promise<Result[]>;
    }
}

export interface BrowserService {
    backgroundPage(): BackgroundPageWindow;
    createTab(url: string): void;
    getPrereleaseMarker(): string;
    getStorage(key: string, _default: string): Promise<string>;
    openOptions(): void;
    requestPermissions(permissions: Record<string, unknown>): Promise<boolean>;
    setStorage(key: string, value: string): Promise<void>;
    windowClose(): void;
}
