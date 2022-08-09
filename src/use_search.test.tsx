import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WrapperComponent, renderHook } from "@testing-library/react-hooks";
import React from "react";
import Result from "./result";
import useSearch from "./use_search";

let results: Result[];
let getEntitlements: () => Promise<Result[]>;
let wrapper: WrapperComponent<string>;

jest.mock("./services/browser");


beforeEach(() => {
    results = [
        {
            icon:  "http://example.com/icon1.png",
            isFavorite: true,
            key: "app-one-id",
            name: "App One",
            target: "https://example.com/app-one"
        },
        {
            icon:  "http://example.com/icon2.png",
            isFavorite: true,
            key: "app-two-id",
            name: "App Two",
            target: "https://example.com/app-twp"
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

    getEntitlements = () => Promise.resolve(results);
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
        data: results,
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
        data: results,
        isLoading: false
    });
});
