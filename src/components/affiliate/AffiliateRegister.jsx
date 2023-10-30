import {
  Avatar,
  Grid,
  Paper,
  TextField,
  InputLabel,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import "../../align.css";
import { Link, useNavigate } from "react-router-dom";
import { userSchema } from "../../validations/UserSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const AffiliateRegister = () => {
  const navigate = useNavigate();
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  const formOptions = { resolver: yupResolver(userSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("profilePicture", "");
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    console.log('Form data :- ', formData)
    axios
      .post("http://localhost:3000/api/affiliate/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Registration Successfull. Verify email and proceed to login");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Registration failed. Navigating to home");
        navigate("/");
      });
  };
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineIcon />
          </Avatar>
          <h2 style={headerStyle}>Affiliate Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
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
          <Link to="/affiliate/login">Login in</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default AffiliateRegister;
