import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";


const queryClient = new QueryClient();
const rootElement = document.getElementById("root");
if (rootElement) {
    const root = createRoot(rootElement);

    root.render(
        <React.StrictMode>
            <QueryClientProvider client={ queryClient }>
                <App />
            </QueryClientProvider>
        </React.StrictMode>
    );

}
