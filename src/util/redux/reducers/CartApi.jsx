import axios from "axios";
import {
  addToCart,
  emptyCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../actions/Actions.jsx";
import copy from "clipboard-copy";
import { showNotification } from "./../../showNotification.js";
import { axiosClient } from "./apiClients.jsx";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:3000/",
//   headers: {
//     Authorization: `${localStorage.getItem("token")}`,
//     "Content-Type": "application/json",
//   },
// });

export const fetchCartApi = () => {
  const config = {
    method: "get",
    url: "http://localhost:3000/cart",
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  return async function (dispatch) {
    axios(config)
      .then((response) => {
        dispatch(getCart(response.data?.cart_items));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addToCartApi = (productData, cartData) => {
  return async (dispatch) => {
    try {
      await axiosClient.post("/cart/add/", {
        ProductId: productData.id,
        quantity: 1,
      });
      dispatch(addToCart(cartData));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const generateReferralLink = (productData) => {
  return async () => {
    try {
      const response = await axiosClient.post("/api/affiliate/generate", {
        prodId: productData.id,
      })
      console.log('reeffferrr', response.data.data.referralLink)
      await copy(response.data.data.referralLink)   //copy referral link
     showNotification({icon: "success", title: "Link copied!", position: 'top'})
    } catch (error) {
      console.log(error.message)
    }
  }
}

export const emptyAllItems = () => {
  return async (dispatch) => {
    try {
      await axiosClient.delete("/cart/removeAll");
      dispatch(emptyCart());
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const removeProduct = (id) => {
  return async (dispatch) => {
    try {
      await axiosClient.request({
        method: "delete",
        url: "/cart/remove",
        data: { ProductId: +id },
      });
      dispatch(removeFromCart(id));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateProduct = (id, quantity) => {
  return async (dispatch) => {
    try {
      await axiosClient.request({
        method: "patch",
        url: "/cart/update",
        data: { ProductId: +id, quantity },
      });
      dispatch(updateCart(id, quantity));
    } catch (error) {
      console.log(error);
    }
  };
};
