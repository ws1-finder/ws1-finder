let currentResponse = null;

export function clear() {
    currentResponse = null;
}

function store(response) {
    if (response.length && response.length > 0) {
        currentResponse = response;
    } else {
        currentResponse = null;
    }
    return response;
}

export function get(response) {
    if (currentResponse !== null) {
        return Promise.resolve(currentResponse);
    } else {
        return response()
            .then(store);
    }
}