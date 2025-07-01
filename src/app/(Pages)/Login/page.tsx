"use client";
import { LoginDataInterface } from "@/Interfaces/RegisterDataInterface";
import { login } from "@/lib/Slices/AuthSlice";
import { RootState, appDispatch } from "@/lib/store";
import {
  Button,
  Container,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<appDispatch>();
  const { token, isLoading, isErrore, isSuccess, error } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    if (token != "") {
      setTimeout(() => {
        router.push("/");
      }, 100);
    }
  }, [token]);

  const initialValues: LoginDataInterface = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is require"),
    password: Yup.string().required("Password is requrie"),
  });

  const { values, handleChange, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues,

      onSubmit: () => {
        dispatch(login(values));
      },
      validationSchema,
    });
  return (
    <>
      <head>
        <title>Login</title>
      </head>
      <form onSubmit={handleSubmit}>
        <FormControl
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Container maxWidth="sm" sx={{ my: "normal" }}>
            <Paper elevation={3} sx={{ padding: "15px" }}>
              <h1 style={{ textAlign: "center" }}>Login</h1>
              <TextField
                id="email-basic"
                label="Email"
                variant="filled"
                fullWidth
                margin="dense"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched && errors.email && (
                <Typography color="red">{errors.email}</Typography>
              )}
              <TextField
                id="password-basic"
                label="Password"
                variant="filled"
                fullWidth
                margin="dense"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              {touched && errors.password && (
                <Typography color="red">{errors.password}</Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: "20px", padding: "10px" }}
              >
                Login
              </Button>
              {isSuccess && (
                <Typography sx={{ color: "green", textAlign: "center" }}>
                  success
                </Typography>
              )}
              {error && (
                <Typography sx={{ color: "red", textAlign: "center" }}>
                  {error}
                </Typography>
              )}
              <Typography sx={{ textAlign: "center", mt: "8px" }}>
                Dont have an account? <Link href={"/Register"}>Register</Link>
              </Typography>
            </Paper>
          </Container>
        </FormControl>
      </form>
    </>
  );
}
