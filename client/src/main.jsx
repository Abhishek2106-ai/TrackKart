import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster }
from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <AuthProvider>
    <ProductProvider>
<>
  <Toaster
    position="top-right"
  />

  <App />
</>    </ProductProvider>
</AuthProvider>
  </BrowserRouter>
);