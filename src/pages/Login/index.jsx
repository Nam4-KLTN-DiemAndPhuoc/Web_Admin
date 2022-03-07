import React from "react";
import { Form, Formik } from "formik";
import { AccountCircle, Lock, Phone } from "@material-ui/icons";
import AuthLaylout from "./../../components/Layout/AuthLayout";

import {
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import useStyles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { login, removeErrorMessage } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { validationLogin } from "../../utils/Validation";
export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, errorMessage } = useSelector((state) => state.auth);

  const handleSubmitForm = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    const res = await dispatch(login(data));
    console.log("XX", errorMessage);

    // if (errorMessage != null) {
    //   alert(errorMessage);
    //   dispatch(removeErrorMessage())
    // } else {
      navigate("/", (require = "true"));

    // }
  };
  return (
    <AuthLaylout>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationLogin}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmitForm(values);
          setSubmitting(true);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          resetForm,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form
            className={classes.form}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Typography variant="h4" color="primary" align="center">
              Login
            </Typography>
            <TextField
              label="Email"
              error={errors.email}
              helperText={errors.email}
              touched={touched.email}
              variant="filled"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
              name="email"
              value={values.email}
              onChange={handleChange}
            ></TextField>
            <TextField
              label="Password"
              error={errors.password}
              helperText={errors.password}
              touched={touched.password}
              type="password"
              fullWidth
              variant="filled"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              name="password"
              onChange={handleChange}
            />
            <div style={{ display: "flex", width: "100%" }}>
              <Button variant="secondary" onClick={resetForm}>
                Reset Form
              </Button>{" "}
              <div id="sign-in-button"> </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Login
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLaylout>
  );
}
