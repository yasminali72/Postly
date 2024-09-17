"use client";
import { RegisterDataInterface } from "@/Interfaces/RegisterDataInterface";
import {
  Container,
  MenuItem,
  Paper,
  Select,
  TextField,
  InputLabel,
  FormControl,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

export default function Register() {
  const [gender, setGender] = useState("");
  const [sucessMsg, setSucessMsg] = useState("");
  const [errorsMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const handleGenderChange = (e: any) => {
    setGender(e.target.value);
  };

  const initialValues: RegisterDataInterface = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth: "",
    gender: "",
  };
  async function onSubmit(values: RegisterDataInterface) {
    await axios
      .post("https://linked-posts.routemisr.com/users/signup", values)
      .then(({ data }) => {
        setErrorMsg("");
        setSucessMsg(data.message);
        setTimeout(() => {
          router.push("Login");
        }, 500);
      })
      .catch(({ response }) => {
        setSucessMsg("");
        setErrorMsg(response.data.error);
      });
  }
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is requrie")
      .min(3, "Name length must be at least 3 chars")
      .max(20, "Name length must be at less then 20 chars"),
    email: Yup.string().required("Email is requrie").email("Enter valid email"),
    password: Yup.string()
      .required("Password is requrie")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
      ),
    rePassword: Yup.string()
      .required("rePassword is requrie")
      .oneOf([Yup.ref("password")], "Password and Repassword not matched"),
    dateOfBirth: Yup.string().required("Date of Birth is requrie"),
    gender: Yup.string().required("Gender is requrie"),
  });
  const { values, handleChange, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues,

      onSubmit,
      validationSchema,
    });
  return (
    <>
      <head>
        <title>Register</title>
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
              <h1 style={{ textAlign: "center" }}>Registration</h1>
              <TextField
                name="name"
                id="name-basic"
                label="Name"
                variant="filled"
                fullWidth
                margin="normal"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name && (
                <Typography color="red">{errors.name}</Typography>
              )}
              <TextField
                name="email"
                id="email-basic"
                label="Email"
                variant="filled"
                fullWidth
                margin="dense"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <Typography color="red">{errors.email}</Typography>
              )}
              <TextField
                name="password"
                id="password-basic"
                label="Password"
                variant="filled"
                fullWidth
                margin="dense"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && (
                <Typography color="red">{errors.password}</Typography>
              )}
              <TextField
                name="rePassword"
                id="rePassword-basic"
                label="Re-Password"
                variant="filled"
                fullWidth
                margin="dense"
                type="password"
                value={values.rePassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.rePassword && errors.rePassword && (
                <Typography color="red">{errors.rePassword}</Typography>
              )}
              <TextField
                name="dateOfBirth"
                id="date"
                label="Date of Birth"
                variant="filled"
                fullWidth
                margin="dense"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={values.dateOfBirth}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.dateOfBirth && errors.dateOfBirth && (
                <Typography color="red">{errors.dateOfBirth}</Typography>
              )}
              <FormControl variant="filled" fullWidth margin="dense">
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  name="gender"
                  labelId="gender-label"
                  id="gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {touched.gender && errors.gender && (
                  <Typography color="red">{errors.gender}</Typography>
                )}
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: "20px", padding: "10px" }}
              >
                Register
              </Button>
              {sucessMsg && (
                <Typography sx={{ textAlign: "center", color: "green" }}>
                  {sucessMsg}
                </Typography>
              )}
              {errorsMsg && (
                <Typography sx={{ textAlign: "center", color: "red" }}>
                  {errorsMsg}
                </Typography>
              )}

              <Typography sx={{ textAlign: "center", mt: "8px" }}>
                Are you have an account? <Link href={"/Login"}>Login</Link>
              </Typography>
            </Paper>
          </Container>
        </FormControl>
      </form>
    </>
  );
}
