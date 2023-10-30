import { useEffect, useState } from "react";
import { Grid, Paper, Typography, Avatar } from "@mui/material";
import axios from "axios";

const UserDashboard = () => {
  const [userData, setUserData] = useState({});
  console.log('fffffffff', userData)
  const config = {
    method: "get",
    url: "http://localhost:3000/api/users/get-user",
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    axios(config)
      .then((response) => {
        console.log('dddddddd', response.data.data)
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const defaultProfilePic = 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/255px-Flag_of_India.svg.png';

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Avatar
            alt={userData.name}
            src={userData?.profile_picture || defaultProfilePic}
            style={{ width: "150px", height: "150px" }}
          />
          <Typography variant="h6" gutterBottom>
            User Information
          </Typography>
          <Typography variant="body1">ID: {userData?.id}</Typography>
          <Typography variant="body1">
            Name: {userData?.first_name + " " + userData?.last_name}
          </Typography>
          <Typography variant="body1">Email: {userData?.email}</Typography>
          {/* <Typography variant="body1">
            Is Verified: {userData?.isVerified ? "Yes" : "No"}
          </Typography> */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserDashboard;
