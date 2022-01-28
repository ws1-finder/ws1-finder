import { renderHook } from "@testing-library/react-hooks";
import { EntitlementsToResults } from "./mappers";
import { Entitlement } from "./services/extension";
import useSearch from "./use_search";

var entitlements: Entitlement[];
var getEntitlements: () => Promise<Entitlement[]>;

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

    getEntitlements = () => Promise.resolve(entitlements);
});

test("then when input promise returns and error the hook returns an error", () => {
    const throwError = () => { throw Error("this is a busted return result"); };
    const { result } = renderHook((q: string) => useSearch(q, throwError), {
        initialProps: ""
    });
    expect(result.current.error).toEqual("this is a busted return result");
});

test("that queries update the result set", async () => {
    const { result, rerender, waitForNextUpdate } = renderHook((q: string) => useSearch(q,getEntitlements), {
        initialProps: ""
    });
    await waitForNextUpdate();

    expect(result.current).toMatchObject({
        data: EntitlementsToResults(entitlements),
        isLoading: false
    });

    rerender("One");

    expect(result.current.data?.length).toEqual(1);
    expect((result.current.data ?? [])[0].name).toEqual("App One");
});

test("that an empty query shows all results", async() => {
    const { result, rerender, waitForNextUpdate } = renderHook((q: string) => useSearch(q, getEntitlements), {
        initialProps: ""
    });
    await waitForNextUpdate();

    rerender("Two");

    expect(result.current.data?.length).toEqual(1);
    expect((result.current.data ?? [])[0].name).toEqual("App Two");

    rerender("");

    expect(result.current).toMatchObject({
        data: EntitlementsToResults(entitlements),
        isLoading: false
    });
});
