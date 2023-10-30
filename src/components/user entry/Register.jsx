import { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  InputLabel,
  Select, 
  MenuItem,
  Typography,
  FormControl,
} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from "@mui/material/Button";
import "../../align.css";
import { Link, useNavigate } from "react-router-dom";
import { userSchema } from "../../validations/UserSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };

  const formOptions = { resolver: yupResolver(userSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [role, setRole] = useState("USER");

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("profilePicture", "");
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", role);
    console.log(`http://localhost:3000/api/${role === 'USER'? 'auth': 'affiliate'}/register`)
    axios
      .post(`http://localhost:3000/api/${role === 'USER'? 'auth': 'affiliate'}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Registration Successful. Verify email and proceed to login");
          navigate("/login");
        } else if (res.status === 400) {
          alert(res.data.msg); // This line should work now
        }
      })
      .catch((error) => {
        if (error.response) {
          // The server returned an error response
          const errorResponse = error.response.data;
          if (errorResponse.msg) {
            alert(errorResponse.msg); // Display the error message from the server
          } else {
            alert("An error occurred on the server.");
          }
        } else {
          console.error("Error:", error);
          alert("Registration failed. Navigating to home");
          navigate("/");
        }
      });
  };
  return (
    <Grid>
      <Paper elevation={15} style={paperStyle}>
        <Grid align="center">
            <PersonAddIcon fontSize="large"/>
          <h2 style={headerStyle}>Sign Up</h2>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="firstName"
            fullWidth
            label="First Name*"
            placeholder="Enter your first name"
            variant="standard"
            {...register("firstName")}
          />
          {errors.firstName && (
            <InputLabel sx={{ color: "error.main" }}>
              {errors.firstName?.message}
            </InputLabel>
          )}
          <TextField
            name="lastName"
            fullWidth
            label="Last Name"
            placeholder="Enter your last name"
            variant="standard"
            {...register("lastName")}
          />
          {errors.lastName && (
            <InputLabel sx={{ color: "error.main" }}>
              {errors.lastName?.message}
            </InputLabel>
          )}
          <TextField
            name="email"
            fullWidth
            label="Email*"
            placeholder="Enter your email"
            variant="standard"
            {...register("email")}
          />
          {errors.email && (
            <InputLabel sx={{ color: "error.main" }}>
              {errors.email?.message}
            </InputLabel>
          )}
          <TextField
            name="password"
            fullWidth
            label="Password*"
            type="password"
            placeholder="Enter your password"
            variant="standard"
            margin="dense"
            {...register("password")}
          />
          {errors.password && (
            <InputLabel sx={{ color: "error.main" }}>
              {errors.password?.message}
            </InputLabel>
          )}
             <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="role">Role*</InputLabel>
              <Select
                name="role"
                label="Role*"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="USER">User</MenuItem>
                <MenuItem value="AFFILIATE">Affiliate</MenuItem>
              </Select>
            </FormControl>

          <br />
          <div className="button-parent">
            <div className="align-left">
              <Button type="submit" variant="contained" color="primary">
                Sign up
              </Button>
            </div>
            <div className="align-right">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back
              </Button>
            </div>
          </div>
        </form>
        <br />
        <Typography>
          Already have an account?
          <Link to="/login">   Login in</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Register;
