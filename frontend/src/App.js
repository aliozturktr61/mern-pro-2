import { Provider, useDispatch, useSelector } from "react-redux"; // Redux Provider import ediliyor
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home"; // 'Home' bileşeninin yolunu kontrol edin
import Header from "./layout/Header"; // 'Header' bileşeninin yolunu kontrol edin
import Footer from "./layout/Footer"; // 'Footer' bileşeninin yolunu kontrol edin
import store from "./redux/store";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Detail from "./pages/detail";
import Products from "./pages/products";
import Auth from "./pages/auth";
import { useEffect } from "react";
import { profile } from "./redux/userSlice";
import Profile from "./pages/profile";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import Cart from "./pages/cart";
import Admin from "./pages/admin";

function App() {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(profile());
  }, [dispatch]);
  return (
    <Provider store={store}>
      {" "}
      {/* Provider ile sarıyoruz */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/reset/:token" element={<ResetPassword />} />

          <Route element={<ProtectedRoute isAdmin={false} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<ProtectedRoute isAdmin={true} user={user} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Detail />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
