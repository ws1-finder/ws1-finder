import Result from "./result";

type State = {
    data?: Result[];
    error?: string;
    isLoading: boolean;
}

type Action =
    | { type: "FETCHING" }
    | { type: "FETCHED", results: Result[] }
    | { type: "FETCH_ERROR", error: string };

const UseSearchReducer = (state: State, action: Action): State => {
    switch (action.type) {
    case "FETCHING":
        return { isLoading: true };
    case "FETCHED":
        return { data: action.results, isLoading: false };
    case "FETCH_ERROR":
        return { error: action.error, isLoading: false };
    default:
        return state;
    }
};

export default UseSearchReducer;
