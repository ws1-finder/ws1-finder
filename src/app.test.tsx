import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import App from "./app";
import browserService from "./services/browser";    

jest.mock("./services/browser");
beforeEach(() => {
    browserService.createTab = jest.fn();
});

afterEach(() => {
    cleanup();
});

it("loads the header", async () => {
    (browserService as any)._setMockEntitlements([
        {
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
    ]);

    render(<App />);
  
    await screen.findByRole("heading");
  
    expect(screen.getByRole("heading")).toHaveTextContent("Workspace One Finder");
    expect(screen.getByRole("list")).toHaveTextContent("App 1");
});
