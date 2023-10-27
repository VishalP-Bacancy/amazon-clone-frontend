export const addToCart = (item) => {
  return {
    type: "ADD_TO_CART",
    payload: item,
  };
};

export const getCart = (item) => {
  return {
    type: "GET_CART",
    payload: item,
  };
};

export const removeFromCart = (itemId) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: itemId,
  };
};

export const emptyCart = () => {
  return { type: "EMPTY_CART" };
};

export const updateCart = (product_id, newQuantity) => {
  return { type: "UPDATE_CART", payload: { product_id, newQuantity } };
};
