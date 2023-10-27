import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const userSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is mandatory"),
  lastName: Yup.string(),
  email: Yup.string()
    .required("Email is mandatory")
    .email("Invalid Email Address"),
  password: Yup.string()
    .min(
      4,
      "password must contain 4 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character")
    .required("No password provided."),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is mandatory")
    .email("Invalid Email Address"),
  password: Yup.string()
    .min(
      4,
      "password must contain 4 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .minLowercase(1, "Invalid Password")
    .minUppercase(1, "Invalid Password")
    .minNumbers(1, "Invalid Password")
    .minSymbols(1, "Invalid Password")
    .required("No password provided."),
});
