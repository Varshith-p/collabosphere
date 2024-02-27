import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import App from "./App.jsx";
import "./index.css";

import store from "./store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>
);
