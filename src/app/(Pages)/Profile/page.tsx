"use client";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Container,
  Input,
  TextField,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { User } from "@/Interfaces/UserInterface";
import { getUser, getUserPosts } from "@/lib/Slices/AuthSlice";
import { RootState, appDispatch } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Post as PostInterface } from "@/Interfaces/PostInterface";
import Post from "@/app/_Components/Post/Post";
import CreatePost from "@/app/_Components/CreatePost/CreatePost";
import Loading from "@/app/_Components/(Loading)/Loading";
import CompareIcon from "@mui/icons-material/Compare";

export default function Profile() {
  const router = useRouter();

  const [image, setImage] = useState(null);
  const [editPotho, setEditPotho] = useState(false);
  const dispatch = useDispatch<appDispatch>();

  const {
    dataUser,
    userPosts,
    isLoading,
  }: { dataUser: User; userPosts: PostInterface[]; isLoading: boolean } =
    useSelector((state: RootState) => state.auth); // Correctly access `dataUser`
  const { user }: any = jwtDecode(localStorage.getItem("token") ?? "");
  console.log(dataUser);

  if (!localStorage.getItem("token")) {
    router.push("/Login");
  }
  useEffect(() => {
    dispatch(getUser());
    dispatch(getUserPosts(user));
  }, [dispatch]);

  async function updatePhoto(e: any) {
    e.preventDefault(); //prevent reload when submit

    const formData = new FormData();
    if (image != null) {
      formData.append("photo", image);
    }

    let { data } = await axios.put(
      "https://linked-posts.routemisr.com/users/upload-photo",
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (data.message === "success") {
      dispatch(getUser());
    }
  }
  return (
    <>
      <head>
        <title>Profile</title>
      </head>
      {isLoading ? (
        <Loading />
      ) : (
        <Container maxWidth="md" sx={{ mt: 5 }}>
          <Card sx={{ padding: 3, borderRadius: 3, boxShadow: 3, mb: "50px" }}>
            <Stack spacing={2}>
              <Grid item xs={12} sm={4} textAlign={"center"}>
                <Avatar
                  alt={dataUser.name}
                  src={dataUser.photo}
                  sx={{ width: 120, height: 120, margin: "0 auto" }}
                />
                <Typography variant="h5" component="div" textAlign={"center"}>
                  {dataUser.name}
                </Typography>
                <IconButton
                  onClick={() => setEditPotho(!editPotho)}
                  sx={{ color: "gray", mt: "5px", ":hover": { color: "blue" } }}
                >
                  <CompareIcon />
                </IconButton>
                {editPotho && (
                  <form onSubmit={updatePhoto}>
                    <Input
                      type="file"
                      sx={{ width: { xs: "100%", md: "50%" } }}
                      inputProps={{ accept: "image/*" }}
                      onChange={(e: any) => setImage(e.target.files[0])}
                    />
                    <br />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: "5px" }}
                    >
                      Update
                    </Button>
                  </form>
                )}
              </Grid>
              <Grid item xs={12} sm={8}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email:</strong> {dataUser.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Gender:</strong> {dataUser.gender}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Date of Birth:</strong> {dataUser.dateOfBirth}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Member Since:</strong>{" "}
                    {new Date(dataUser.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Grid>
            </Stack>
          </Card>
          <CreatePost />
          {userPosts.map((post) => {
            return <Post post={post} key={post._id} />;
          })}
        </Container>
      )}
    </>
  );
}
