import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/user entry/Login";
import Register from "../components/user entry/Register";
import NavigationBar from "../components/NavigationBar";
import ProductsView from "../components/products/ProductsView";
import Home from "../components/Home";
import Cart from "../components/Cart";
import ProductDetail from "../components/products/ProductDetail";
import UserDashboard from "../components/dashboard/UserDashboard";
import Logout from "../components/user entry/Logout";
import { AuthContextExport } from "../util/context/AuthContext";
import Error from "../components/Error";
import { useDispatch } from "react-redux";
import { fetchCartApi } from "../util/redux/reducers/CartApi";
import Orders from "../components/Orders";
import axios from "axios";
import ProductDetailAffiliate from "../components/products/ProductDetail-affiliate";

const Router = () => {
  const dispatch = useDispatch();
  // const [role, setRole] = useState('')
  const token = localStorage.getItem("token");
  const { login,role } = AuthContextExport();
  useEffect(() => {
    if (token) {
      axios
      .get(`http://localhost:3000/api/users/role`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then(response => {
        const role = response.data.userRole
        console.log('Role:- ', response.data.userRole)
        // setRole(response.data.userRole)
        login(token, role);
        dispatch(fetchCartApi());
      })
    }
  }, []);
  return (
    <div>
      <NavigationBar />
      <Routes>
        {!token ? (
          <>
            <Route path="login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : role==='USER'?(
          <>
            <Route path="logout" element={<Logout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/orders" element={<Orders />} />
          </>
        ):(<>
            <Route path="logout" element={<Logout />} />
            <Route path="/dashboard" element={<UserDashboard />} />
        </>)}
          <Route path="/product/:id/:productName" element={<ProductDetailAffiliate />}/>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace={true} />} />
        <Route path="/products" element={<ProductsView />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Router;
