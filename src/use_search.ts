import { useQuery } from "@tanstack/react-query";
import { EntitlementsToResults } from "./mappers";
import Result from "./result";
import { Entitlement, entitlements } from "./services/extension";

type searchResult = {
    data: Result[] | undefined;
    error?: Error | null;
    isLoading: boolean;
}

const useSearch = (query: string, getEntitlements: () => Promise<Entitlement[]> = entitlements): searchResult => {
    const { data, isLoading, error } = useQuery<Result[], Error>(["entitlements", query], (): Promise<Result[]> => {
        return getEntitlements().then(entitlements => entitlements.filter((result)  => {
            return (
                result
                    .name
                    .toLowerCase()
                    .includes(query.toLowerCase())
            );
        })).then(EntitlementsToResults);  
    });

    return { data: data,  error: error, isLoading: isLoading };
};
export default useSearch;
