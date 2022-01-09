import { useEffect, useRef, useReducer } from 'react';
import { EntitlementsToResults } from './mappers';
import Result from './result';

const useSearch = (getEntitlements: Function, query: string) => {
    const cache = useRef<Result[]>([])

    type State = {
        data?: Result[];
        isLoading: boolean;
        error?: string;
    }

    type Action =
        | { type: 'FETCHING' }
        | { type: 'FETCHED', results: any[] }
        | { type: 'FETCH_ERROR', error: string };

    function reducer(state: State, action: Action): State {
        switch (action.type) {
            case 'FETCHING':
                return { isLoading: true };
            case 'FETCHED':
                return { isLoading: false, data: EntitlementsToResults(action.results) };
            case 'FETCH_ERROR':
                return { isLoading: false, error: action.error };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, { isLoading: false });

    useEffect(() => {
        let cancelRequest = false;
        const fetchEntitlements = async () => {
            dispatch({ type: 'FETCHING' });
            if (cache.current && cache.current.length > 0) {
                dispatch({ type: 'FETCHED', results: cache.current });
            } else {
                try {
                    const entitlements = await getEntitlements();
                    cache.current = entitlements;
                    if (cancelRequest) return;
                    dispatch({ type: 'FETCHED', results: entitlements });
                } catch (error: any) {
                    if (cancelRequest) return;
                    let message = 'Unknown Error'
                    if (error instanceof Error) {
                        message = error.message
                    } else {
                        if(error.message) {
                            message = error.message
                        }
                    }
                    dispatch({ type: 'FETCH_ERROR', error: message });
                }
            }
        }

        fetchEntitlements();

        return () => { cancelRequest = true }
    }, [getEntitlements])

    useEffect(() => {
        let cancelRequest = false;
        const results = cache.current;

        if (!query) return;
        if (!results) return;

        dispatch({ type: 'FETCHING' });

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
        dispatch({ type: 'FETCHED', results: filteredResults });

        return () => { cancelRequest = true }
    }, [query]);

    return state;
};
export default useSearch;