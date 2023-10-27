import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/orders/history", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const sortedOrders = response.data.OrderDetails.sort(
          (a, b) => b.order_id - a.order_id
        );
        setOrders(sortedOrders);
      });
  }, []);
  return (
    <div>
      {orders.map((order, index) => (
        <Paper
          key={index}
          elevation={3}
          style={{ padding: 20, marginBottom: 20 }}
        >
          <Typography variant="h5" gutterBottom>
            Order Details
          </Typography>

          <Typography variant="subtitle1">
            Order ID: {order.order_id}
          </Typography>

          <Divider style={{ marginTop: 20, marginBottom: 20 }} />

          <Typography variant="h6" gutterBottom>
            Products:
          </Typography>

          <List>
            {order.products.map((product, productIndex) => (
              <ListItem key={productIndex}>
                <ListItemAvatar>
                  <Avatar src={product.image} alt={product.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={`Description: ${product.description}, ==== Price: $${product.price}, ==== Quantity: ${product.quantity}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </div>
  );
};

export default Orders;
