import "./App.css";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import Orders from "./pages/Orders";
import Stocks from "./pages/Stocks";
import SignupPage from "./pages/SignupPage";

import { StockContextProvider } from "./context/StockContext";
import { OrdersProvider } from "./context/OrdersContext";
import {UserProvider} from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
    <UserProvider>
      <OrdersProvider>
        <StockContextProvider>
          <Routes>
            {/* Public Route */}
            <Route path="auth" element={<SignupPage />} />

            {/* Protected / Dashboard Layout */}
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="orders" element={<Orders />} />
              <Route path="stock" element={<Stocks />} />
            </Route>
          </Routes>
        </StockContextProvider>
      </OrdersProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
