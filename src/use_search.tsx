import { useEffect, useReducer, useRef } from "react";
import { EntitlementsToResults } from "./mappers";
import Result from "./result";

const useSearch = (getEntitlements: Function, query: string) => {
    const cache = useRef<Result[]>([]);

    type State = {
        data?: Result[];
        error?: string;
        isLoading: boolean;
    }

    type Action =
        | { type: "FETCHING" }
        | { type: "FETCHED", results: any[] }
        | { type: "FETCH_ERROR", error: string };

    function reducer(state: State, action: Action): State {
        switch (action.type) {
        case "FETCHING":
            return { isLoading: true };
        case "FETCHED":
            return { data: EntitlementsToResults(action.results), isLoading: false  };
        case "FETCH_ERROR":
            return { error: action.error, isLoading: false };
        default:
            return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, { isLoading: false });

    useEffect(() => {
        let cancelRequest = false;
        const fetchEntitlements = async () => {
            dispatch({ type: "FETCHING" });
            if (cache.current && cache.current.length > 0) {
                dispatch({ results: cache.current, type: "FETCHED" });
            } else {
                try {
                    const entitlements = await getEntitlements();
                    cache.current = entitlements;
                    if (cancelRequest) return;
                    dispatch({ results: entitlements, type: "FETCHED" });
                } catch (error: any) {
                    if (cancelRequest) return;
                    let message = "Unknown Error";
                    if (error instanceof Error) {
                        message = error.message;
                    } else {
                        if(error.message) {
                            message = error.message;
                        }
                    }
                    dispatch({ error: message, type: "FETCH_ERROR" });
                }
            }
        };

        fetchEntitlements();

        return () => { cancelRequest = true; };
    }, [getEntitlements]);

    useEffect(() => {
        let cancelRequest = false;
        const results = cache.current;

        if (!query) return;
        if (!results) return;

        dispatch({ type: "FETCHING" });

        const filteredResults = results.filter((entitlement): entitlement is any => {
            return (
                entitlement
                    .name
                    .toLowerCase()
                    .includes(query.toLowerCase())
            );
        }
        );

        if (cancelRequest) return;
        dispatch({ results: filteredResults, type: "FETCHED" });

        return () => { cancelRequest = true; };
    }, [query]);

    return state;
};
export default useSearch;
