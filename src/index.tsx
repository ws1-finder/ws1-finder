import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            keepPreviousData: true
        }
    }
});

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={ queryClient }>
            <App />
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
