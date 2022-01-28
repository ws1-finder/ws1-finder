import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import App from "./app";
import browserService, { BrowserService } from "./services/browser";    
import { Entitlement } from "./services/extension";

jest.mock("./services/browser");

interface MockBrowserService extends BrowserService {
    _setMockEntitlements: (entitlements: Entitlement[]) => void;
}

const mockBrowserService: MockBrowserService = browserService as any;

const mockEntitlements = [{
    _links: {
        icon: {
            href: "https://example.com/icon1.png"
        }
    },
    appId: "appId-1",
    favorite: true,
    launchUrl: "https://example.com/app1",
    name: "App 1"
},
{
    _links: {
        icon: {
            href: "https://example.com/icon2.png"
        }
    },
    appId: "appId-2",
    favorite: true,
    launchUrl: "https://example.com/app2",
    name: "App 2"
}
];

beforeEach(() => {
    mockBrowserService.createTab = jest.fn();
});

afterEach(() => {
    cleanup();
});

it("loads the header", async () => {
    mockBrowserService._setMockEntitlements(mockEntitlements);

    render(<App />);
  
    await screen.findByRole("heading");
  
    expect(screen.getByRole("heading")).toHaveTextContent("Workspace One Finder");
    expect(screen.getByRole("list")).toHaveTextContent("App 1");
});

describe("when there's data", () => {
    it("launches the first result when enter is hit", async () => {
        mockBrowserService._setMockEntitlements(mockEntitlements);

        render(<App />);
        await screen.findByRole("heading");
  
        const domNode = screen.getByRole("searchbox");

        fireEvent.keyDown(domNode, { charCode: 13, code: "Enter", key: "Enter" });

        expect(browserService.createTab).toHaveBeenCalledTimes(1);
        expect(browserService.createTab).toHaveBeenCalledWith("https://example.com/app1");
    });
});


describe("when there is no data", () => {
    it("does not try and launch anything", async () => {
        mockBrowserService._setMockEntitlements([]);

        render(<App />);
        await screen.findByRole("heading");
  
        const domNode = screen.getByRole("searchbox");

        fireEvent.keyDown(domNode, { charCode: 13, code: "Enter", key: "Enter" });

        expect(browserService.createTab).not.toHaveBeenCalled();
    });
});



