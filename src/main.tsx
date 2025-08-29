import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import AppProviders from "./components/AppProviders/AppProviders.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProviders>
    <App />
  </AppProviders>,
);
