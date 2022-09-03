import React from "react";
import { createRoot } from "react-dom/client";

import "./configureFontAwesome";
import { App } from "./App";

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Element with id = 'root' not found");
}

const root = createRoot(rootElement);
root.render(<App />);
