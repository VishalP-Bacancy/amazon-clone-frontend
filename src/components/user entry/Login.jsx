import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  InputLabel,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../validations/UserSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContextExport } from "../../util/context/AuthContext";
import { useDispatch } from "react-redux";
import { fetchCartApi } from "../../util/redux/reducers/CartApi";

const Login = () => {
  const { login } = AuthContextExport();
  const dispatch = useDispatch();
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const navigate = useNavigate();

  const formOptions = { resolver: yupResolver(loginSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3000/api/auth/login", {
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
        console.log(error.message);
        alert("Login failed. Navigating to home");
        navigate("/");
      });
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
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
        <Typography>
         Login as Affilliate?       <Link to="/afilliate/login">Login</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
