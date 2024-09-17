import {
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { getPosts } from "@/lib/Slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, appDispatch } from "@/lib/store";
import { jwtDecode } from "jwt-decode";
import { getUserPosts } from "@/lib/Slices/AuthSlice";

export default function CreatePost() {
  const [bodyPost, setBodyPost] = useState("");
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<appDispatch>();
  useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(getPosts(50));
  }, [dispatch]);
  async function onSubmit(e: any) {
    const { user }: any = jwtDecode(localStorage.getItem("token") ?? "");

    e.preventDefault(); //prevent reload when submit

    const formData = new FormData();
    formData.append("body", bodyPost);
    if (image != null) {
      formData.append("image", image);
    }

    setIsLoading(true);
    let { data } = await axios.post(
      "https://linked-posts.routemisr.com/posts",
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data);
    if (data.message === "success") {
      setIsLoading(false);
      setBodyPost("");
      clearImage();
      dispatch(getPosts(50));
      dispatch(getUserPosts(user));
    }
  }
  function onFileChange(e: any) {
    const imgSrc = URL.createObjectURL(e.target.files[0]);
    setImageSrc(imgSrc);
    setImage(e.target.files[0]);
  }
  function clearImage() {
    setImage(null);
    setImageSrc("");
  }
  return (
    <Box
      border={"1px solid"}
      padding={"16px"}
      width={"100%"}
      margin={"auto"}
      borderRadius={"8px"}
      borderColor={"#ddd"}
      boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
      bgcolor={"#fafafa"}
    >
      <Typography
        fontWeight={"bold"}
        fontSize={"24px"}
        mb={2}
        color={"#333"}
        textAlign={"center"}
      >
        Create a Post
      </Typography>

      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            id="outlined-multiline-flexible"
            label="Post body"
            multiline
            fullWidth
            rows={4}
            required
            onChange={(e) => {
              setBodyPost(e.target.value);
            }}
            value={bodyPost}
          />

          {!imageSrc && (
            <TextField
              variant="outlined"
              type="file"
              fullWidth
              inputProps={{ accept: "image/*" }}
              onChange={onFileChange}
              value={imageSrc}
            />
          )}

          {imageSrc && (
            <>
              <div style={{ textAlign: "right" }}>
                <IconButton aria-label="close" onClick={clearImage}>
                  <CloseIcon />
                </IconButton>
              </div>
              <img
                src={imageSrc}
                alt="Selected"
                style={{
                  maxWidth: "50%",
                  height: "50%",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ py: "12px", textTransform: "capitalize" }}
            disabled={isLoading}
          >
            share{" "}
            {isLoading && (
              <CircularProgress size={20} sx={{ color: "white", ml: "5px" }} />
            )}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
