import React from "react";
import { Grid, Typography, Button, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "../align.css";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  emptyAllItems,
  removeProduct,
  updateProduct,
} from "../util/redux/reducers/CartApi";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartReducer);

  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price_per_unit * item.quantity,
    0
  );
  const formattedTotal = total.toFixed(2);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    const config = {
      method: "post",
      url: "http://localhost:3000/api/orders/place",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: {
        shipping: {
          street: "Law Garden",
          city: "Maninagar",
          zipCode: "890XXG",
        },
        paymentMethod: "credit_card",
      },
    };
    axios(config).then(() => {
      dispatch(emptyAllItems());
      setOpen(false);
      navigate("/orders");
    });
  };

  const backgroundColor = "#fff";
  const textColor = "#333";
  const primaryButtonColor = "#FF9900";
  const secondaryButtonColor = "#444";
  const separatorColor = "#ccc";

  return (
    <div style={{ backgroundColor }}>
      {cartItems.length === 0 || !cartItems ? (
        <>
          <div className="align-center">
            <h1>Cart is empty</h1>
          </div>
        </>
      ) : (
        <>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => {
              if (cartItems.length > 0) {
                dispatch(emptyAllItems());
              }
            }}
            sx={{ marginTop: "20px", marginLeft: "20px" }}
            style={{ backgroundColor: secondaryButtonColor, color: "#fff" }}
          >
            Clear Cart
          </Button>
          <div style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom style={{ color: textColor }}>
              Shopping Cart
            </Typography>
            {cartItems.map((item, index) => (
              <div key={index}>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.product_name}
                      style={{
                        maxWidth: "100%",
                        width: "100px",
                        height: "100px",
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" style={{ color: textColor }}>
                      {item.product_name}
                    </Typography>
                    <Typography variant="body1" style={{ color: textColor }}>
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="h6" style={{ color: textColor }}>
                      $ {item.price_per_unit}
                    </Typography>
                    <div>
                      <IconButton
                        color="secondary"
                        onClick={() =>
                          dispatch(
                            updateProduct(item.product_id, item.quantity - 1)
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          dispatch(
                            updateProduct(item.product_id, item.quantity + 1)
                          )
                        }
                      >
                        +
                      </IconButton>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        dispatch(removeProduct(item.product_id));
                      }}
                      style={{
                        backgroundColor: secondaryButtonColor,
                        color: "#fff",
                      }}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
                {index < cartItems.length - 1 && (
                  <div
                    style={{
                      width: "100%",
                      borderBottom: `1px solid ${separatorColor}`,
                      margin: "10px 0",
                    }}
                  />
                )}
              </div>
            ))}
            <div className="align-center">
              <div style={{ marginTop: "20px" }}>
                <Typography variant="h6" style={{ color: textColor }}>
                  Total Price: $ {formattedTotal}
                </Typography>
                <Button
                  component={Link}
                  to="/"
                  variant="outlined"
                  style={{ color: textColor }}
                >
                  Back to Shop
                </Button>
                <Button
                  variant="contained"
                  sx={{ marginLeft: "5px" }}
                  onClick={handleClickOpen}
                  style={{ backgroundColor: primaryButtonColor, color: "#fff" }}
                >
                  Checkout
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Proceed Ahead?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Click the confirm button to place order
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} style={{ color: textColor }}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleConfirm}
                      autoFocus
                      style={{
                        backgroundColor: primaryButtonColor,
                        color: "#fff",
                      }}
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
