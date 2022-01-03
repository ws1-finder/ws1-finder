import { useEffect, useRef, useReducer } from 'react';
import { EntitlementsToResults } from './mappers';

const useSearch = (getEntitlements, query) => {
    const cache = useRef({});

    const initialState = {
        status: 'idle',
        results: [],
        error: null
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'FETCHING':
                return { ...initialState, status: 'fetching' };
            case 'FETCHED':
                return { ...initialState, status: 'fetched', results: EntitlementsToResults(action.payload) };
            case 'FETCH_ERROR':
                return { ...initialState, status: 'error', error: action.payload };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        let cancelRequest = false;
        const fetchEntitlements = async () => {
            dispatch({ type: 'FETCHING' });
            if (cache.current['entitlements']) {
                dispatch({ type: 'FETCHED', payload: cache.current['entitlements'] });
            } else {
                try {
                    const entitlements = await getEntitlements();
                    cache.current['entitlements'] = entitlements;
                    if (cancelRequest) return;
                    dispatch({ type: 'FETCHED', payload: entitlements });
                } catch (error) {
                    if (cancelRequest) return;
                    dispatch({ type: 'FETCH_ERROR', payload: error.message });
                }
            }
        }

        fetchEntitlements();

        return () => cancelRequest = true;
    }, [])

    useEffect(() => {
        let cancelRequest = false;
        const entitlements = cache.current['entitlements'];

        if (!query) return;
        if (!entitlements) return;

        dispatch({ type: 'FETCHING' });

        const filteredEntitlements = entitlements.filter(
            entitlement => {
                return (
                    entitlement
                        .name
                        .toLowerCase()
                        .includes(query.toLowerCase())
                );
            }
        );

        if (cancelRequest) return;
        dispatch({ type: 'FETCHED', payload: filteredEntitlements });

        return () => cancelRequest = true;
    }, [query]);

    return state;
};
export default useSearch;