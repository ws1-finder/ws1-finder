function checkAuthenticated(response) {
    if (response.status === 401) {
        throw Error('Not authenticated');
    }
    return response;
}

function checkOk(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response;
}

export function checkStatus(response) {
    return checkAuthenticated(response) && checkOk(response);
}