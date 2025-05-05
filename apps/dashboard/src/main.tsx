import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "#/App";

import "#/styles/index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/trpc";

const rootEl = document.getElementById("root");

if (!rootEl) {
	throw new Error("root element not found");
}

createRoot(rootEl).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</StrictMode>,
);
