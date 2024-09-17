"use client";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [pass, setPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [isError, setIsError] = useState("");
  const [isSuccess, setIsSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .patch(
        "https://linked-posts.routemisr.com/users/change-password",
        { password: pass, newPassword: newPass },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => {
        if (data.message === "success") {
          setIsLoading(false);
          setIsError("");
          setIsSuccess(data.message);
          localStorage.removeItem("token");
          localStorage.setItem("token", data.token);

          setTimeout(() => {
            router.push("/");
          }, 5000);
        }
      })
      .catch(({ response }) => {
        setIsLoading(false);
        setIsSuccess("");
        setIsError(response.data.error);
      });
  }
  return (
    <>
      <head>
        <title>Change Password</title>
      </head>
      <Container maxWidth="md" style={{ marginTop: "200px" }}>
        <form onSubmit={onSubmit}>
          <Box sx={{ boxShadow: 3, p: 2 }}>
            <Stack spacing={2} alignItems={"center"}>
              <Typography variant="h3" textAlign={"center"}>
                Change your Pasword
              </Typography>

              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
              />

              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  required
                  onChange={(e) => setPass(e.target.value)}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  New Password
                </InputLabel>
                <OutlinedInput
                  required
                  onChange={(e) => setNewPass(e.target.value)}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="New Password"
                />
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  ":disabled": { cursor: "not-allowed" },
                }}
                disabled={isLoading}
              >
                Submit{" "}
                {isLoading && (
                  <CircularProgress
                    size={20}
                    sx={{ color: "white", ml: "5px" }}
                  />
                )}
              </Button>
              {isError && (
                <Typography
                  variant="body1"
                  sx={{ color: "red", textAlign: "center" }}
                >
                  {isError}
                </Typography>
              )}
              {isSuccess && (
                <Typography
                  variant="body1"
                  sx={{ color: "green", textAlign: "center" }}
                >
                  {isSuccess}
                </Typography>
              )}
            </Stack>
          </Box>
        </form>
      </Container>
    </>
  );
}
