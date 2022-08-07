import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WrapperComponent, renderHook } from "@testing-library/react-hooks";
import React from "react";
import { EntitlementsToResults } from "./mappers";
import { Entitlement } from "./services/extension";
import useSearch from "./use_search";

let entitlements: Entitlement[];
let getEntitlements: () => Promise<Entitlement[]>;
let wrapper: WrapperComponent<string>;

jest.mock("./services/browser");


beforeEach(() => {
    entitlements = [
        {
            _links: {
                icon: {
                    href: "http://example.com/icon1.png"
                }
            },
            appId: "app-one-id",
            favorite: true,
            launchUrl: "https://example.com/app-one",
            name: "App One"
        },
        {
            _links: {
                icon: {
                    href: "http://example.com/icon2.png"
                }
            },
            appId: "app-two-id",
            favorite: true,
            launchUrl: "https://example.com/app-two",
            name: "App Two"
        }
    ];

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        },
        logger: {
            // eslint-disable-next-line @typescript-eslint/no-empty-function, no-console
            error: process.env.NODE_ENV === "test" ? () => {} : console.error,
            // eslint-disable-next-line no-console
            log: console.log,
            // eslint-disable-next-line no-console
            warn: console.warn
        }
    });

    // eslint-disable-next-line react/display-name, react/prop-types
    wrapper = ({ children }) => (
        <QueryClientProvider client= { queryClient } >
            { children }
        </QueryClientProvider>
    );

    getEntitlements = () => Promise.resolve(entitlements);
});

test("then when input promise returns and error the hook returns an error", async () => {
    const throwError = () => { throw Error("this is a busted return result"); };
    const { result, waitFor } = renderHook((q: string) => useSearch(q, throwError), {
        initialProps: "",
        wrapper: wrapper
    });
    await waitFor(() => {
        return !result.current.isLoading;
    });
      

    expect(result.current.error).toEqual(Error("this is a busted return result"));
});

test("that queries update the result set", async () => {
    const { result, rerender, waitFor } = renderHook((q: string) => useSearch(q,getEntitlements), {
        initialProps: "",
        wrapper: wrapper
    });

    await waitFor(() => {
        return !result.current.isLoading;
    });

    expect(result.current).toMatchObject({
        data: EntitlementsToResults(entitlements),
        isLoading: false
    });

    rerender("One");

    await waitFor(() => {
        return !result.current.isLoading;
    });

    expect(result.current.data?.length).toEqual(1);
    expect((result.current.data ?? [])[0].name).toEqual("App One");
});

test("that an empty query shows all results", async() => {
    const { result, rerender, waitFor } = renderHook((q: string) => useSearch(q, getEntitlements), {
        initialProps: "",
        wrapper: wrapper
    });

    await waitFor(() => {
        return !result.current.isLoading;
    });

    rerender("Two");
    await waitFor(() => {
        return !result.current.isLoading;
    });

    expect(result.current.data?.length).toEqual(1);
    expect((result.current.data ?? [])[0].name).toEqual("App Two");

    rerender("");

    expect(result.current).toMatchObject({
        data: EntitlementsToResults(entitlements),
        isLoading: false
    });
});
