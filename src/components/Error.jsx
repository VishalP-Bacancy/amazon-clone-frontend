import React from "react";
import "../align.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <>
      <div className="align-center">
        <h2>404 Page not Found</h2>
      </div>
      <div className="align-center">
        <Button component={Link} to="/" variant="outlined" color="primary">
          Back to Shop
        </Button>
      </div>
    </>
  );
};

export default Error;
