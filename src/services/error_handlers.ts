import { baseURL } from "./extension";
import { launchURLAndClose } from "./url_launcher";

export function authentication(err: Error) {
    if (err.message.includes("Not authenticated")) {
        baseURL().then((url: string | unknown) => {
            if (typeof url === "string") {
                launchURLAndClose(url);
            }
        });
    }
    return Promise.reject(err);
}
