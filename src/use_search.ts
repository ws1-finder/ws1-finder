import { useQueries } from "@tanstack/react-query";
import Result from "./result";
import { entitlements } from "./services/extension";

type searchResult = {
    data: Result[] | undefined;
    error?: unknown;
    isLoading: boolean;
}

const useSearch = (query: string,
    fns: { [name: string]: (query: string)=> Promise<Result[]> } = { "entitlements": entitlements }): searchResult => {

    const queryResults = useQueries({
        queries: Object.keys(fns).map(queryKey => {
            return {
                queryFn: () => fns[queryKey](query),
                queryKey: [queryKey, query],
                staleTime: Infinity
            };
        })
    });

    return { data: queryResults[0].data, error: queryResults[0].error, isLoading: queryResults[0].isLoading  };
};
export default useSearch;
