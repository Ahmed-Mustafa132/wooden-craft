import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { CartProvider } from "./Context/CartContext";
import { AuthProvider } from "./Context/AuthContext";
import { ThemeProvider } from "./Context/ThemeContext";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Products from "./Pages/Products/Products";
import Product from "./Pages/Product/Product";
import CreateProduct from "./Pages/CreateProduct/CreateProduct";
import Footer from "./components/Footer/Footer";
import Aboutme from "./Pages/Aboutme/Aboutme";
import Contact from "./Pages/Contact/Contact";
import Error from "./Pages/Error/Error";
import Dashboard from "./Pages/Dashboard/Dashbord";
import DashboardProducts from "./Pages/Dashboard/DashboardProducts";
import DashboardOrders from "./Pages/Dashboard/OrdersDashboard";
import DashboardUsers from "./Pages/Dashboard/DashBoardUsers";
import Checkout from "./Pages/Checkout/Checkout";
import MyOrders from "./Pages/MyOrders/MyOrders";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <CartProvider>
            <Navbar />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/aboutme" element={<Aboutme />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard">
              <Route index element={<Dashboard />} />
              <Route path="CreateProduct" element={<CreateProduct />} />
              <Route path="products" element={<DashboardProducts />} />
              <Route path="orders" element={<DashboardOrders />} />
              <Route path="users" element={<DashboardUsers />} />
              {/* 
              <Route path="categories" element={<DashboardCategories />} />
              <Route path="reviews" element={<DashboardReviews />} />
              <Route path="offers" element={<DashboardOffers />} /> */}
            </Route>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order" element={<MyOrders />} />
            <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
          </CartProvider>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
