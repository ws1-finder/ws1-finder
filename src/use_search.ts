import { useEffect, useReducer, useRef } from "react";
import { EntitlementsToResults } from "./mappers";
import Result from "./result";
import { Entitlement, entitlements } from "./services/extension";
import UseSearchReducer from "./use_search_reducer";

const useSearch = (query: string, getEntitlements: () => Promise<Entitlement[]> = entitlements) => {
    const cache = useRef<Result[]>([]);

    const [state, dispatch] = useReducer(UseSearchReducer, { isLoading: false });

    useEffect(() => {
        let cancelRequest = false;
        const fetchEntitlements = async () => {
            dispatch({ type: "FETCHING" });
            if (cache.current && cache.current.length > 0) {
                dispatch({ results: cache.current, type: "FETCHED" });
            } else {
                try {
                    const entitlements = await getEntitlements();
                    const results = EntitlementsToResults(entitlements);
                    cache.current = results;
                    if (cancelRequest) return;
                    dispatch({ results: results, type: "FETCHED" });
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
        if(state.error) return;
        let cancelRequest = false;
        const results = cache.current;

        if (!query && results.length > 0) {
            if (cancelRequest) return;
            dispatch({ results: results, type: "FETCHED" });
        } 

        if (!query) return;
        if (!results) return;

        dispatch({ type: "FETCHING" });

        const filteredResults = results.filter((result)  => {
            return (
                result
                    .name
                    .toLowerCase()
                    .includes(query.toLowerCase())
            );
        }
        );

        if (cancelRequest) return;
        dispatch({ results: filteredResults, type: "FETCHED" });

        return () => { 
            cancelRequest = true;
        };
    }, [query, state.error]);

    return state;
};
export default useSearch;
