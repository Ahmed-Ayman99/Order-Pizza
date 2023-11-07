import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";

import Loadding from "./ui/Loadding";

const Home = lazy(() => import("./ui/Home"));
const Error = lazy(() => import("./ui/Error"));
const Menu = lazy(() => import("./features/menu/Menu"));
const Cart = lazy(() => import("./features/cart/Cart"));
const CreateOrder = lazy(() => import("./features/order/CreateOrder"));
const Order = lazy(() => import("./features/order/Order"));
const AppLayout = lazy(() => import("./ui/AppLayout"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loadding />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/new" element={<CreateOrder />} />
            <Route path="/order/:orderId" element={<Order />} />
            <Route path="/order/new" element={<CreateOrder />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 4000,
            },
            style: {
              fontSize: "1.6rem",
              maxWidth: "50rem",
              padding: ".6rem 1.2rem",
              backgroundColor: "rgb(250, 204, 21)",
              color: "#000",
            },
          }}
        />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
