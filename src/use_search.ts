import { useQueries } from "@tanstack/react-query";
import Result from "./result";
import { entitlements } from "./services/extension";

type searchResult = {
    data: Result[] | undefined;
    error?: unknown;
    isLoading: boolean;
}

const filteredResults = (results: () => Promise<Result[]>, query: string) : Promise<Result[]> => {
    return results().then(r => r.filter((result)  => {
        return (
            result
                .name
                .toLowerCase()
                .includes(query.toLowerCase())
        );
    }));
};

const useSearch = (query: string,
    fns: { [name: string]: () => Promise<Result[]> } = { "entitlements": entitlements }): searchResult => {

    const queryResults = useQueries({
        queries: Object.keys(fns).map(queryKey => {
            return {
                queryFn: () => filteredResults(fns[queryKey], query), queryKey: [queryKey, query]
            };
        })
    });

    return { data: queryResults[0].data, error: queryResults[0].error as Error, isLoading: queryResults[0].isLoading  };
};
export default useSearch;
