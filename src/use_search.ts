import { useQueries } from "@tanstack/react-query";
import Result from "./result";
import { entitlements } from "./services/extension";

type searchResult = {
    data: Result[];
    error?: unknown;
    isLoading: boolean;
}

const filteredResults = (data: Result[], query: string) : Result[] => {
    return data.filter((result)  => {
        return (
            result
                .name
                .toLowerCase()
                .includes(query.toLowerCase())
        );
    });
};

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

    let data = queryResults[0].data;
    if(data && queryResults[0].isPreviousData) {
        data = filteredResults(data, query);
    }
    return { data: data ?? [] , error: queryResults[0].error, isLoading: queryResults[0].isLoading  };
};

export default useSearch;
