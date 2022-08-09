import { useQuery } from "@tanstack/react-query";
import Result from "./result";
import { entitlements } from "./services/extension";

type searchResult = {
    data: Result[] | undefined;
    error?: Error | null;
    isLoading: boolean;
}

const useSearch = (query: string, getEntitlements: () => Promise<Result[]> = entitlements): searchResult => {
    const { data, isLoading, error } = useQuery<Result[], Error>(["entitlements", query], (): Promise<Result[]> => {
        return getEntitlements().then(entitlements => entitlements.filter((result)  => {
            return (
                result
                    .name
                    .toLowerCase()
                    .includes(query.toLowerCase())
            );
        }));
    });

    return { data: data,  error: error, isLoading: isLoading };
};
export default useSearch;
