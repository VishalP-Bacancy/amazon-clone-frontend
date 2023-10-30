import {
  Grid,
  Paper,
  TextField,
  Button,
  InputLabel,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../validations/UserSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContextExport } from "../../util/context/AuthContext";
import { useDispatch } from "react-redux";
import { fetchCartApi } from "../../util/redux/reducers/CartApi";
import { useState } from "react";

const Login = () => {
  const { login } = AuthContextExport();
  const dispatch = useDispatch();
  const paperStyle = {
    padding: "30px 20px",
    height: "40.6vh",
    width: 300,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };
  const headerStyle = { margin: 0 };

  const navigate = useNavigate();

  const formOptions = { resolver: yupResolver(loginSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [role, setRole] = useState("USER");


  const onSubmit = (data) => {
    console.log('dataaaaaaaaa', role)
    axios
      .post(`http://localhost:3000/api/${role === 'USER'? 'auth': 'affiliate'}/login`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.data.data.token) {
          localStorage.setItem("token", res?.data?.data?.token || "");
          setTimeout(() => {
            login(res.data.data.token);
            dispatch(fetchCartApi());
            alert("Login Successful");
            navigate("/");
          }, 1000);
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
          alert("Login failed. Navigating to home");
          navigate("/");
        }
      });
  };
  return (
    <Grid>
      <Paper elevation={15} style={paperStyle}>
        <Grid align="center">
            <LoginIcon fontSize="large"/>
          <h2 style={headerStyle}>Sign In</h2>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email*"
            placeholder="Enter email*"
            fullWidth
            variant="standard"
            {...register("email")}
          />
          {errors.email && (
            <InputLabel sx={{ color: "error.main" }}>
              {errors.email?.message}
            </InputLabel>
          )}
          <TextField
            label="Password*"
            placeholder="Enter password*"
            type="password"
            variant="standard"
            fullWidth
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
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Back To Home
          </Button>
        </form>
        <Typography>
         Create account?       <Link to="/register">Sign Up</Link>
        </Typography>
    
      </Paper>
    </Grid>
  );
};

export default Login;
