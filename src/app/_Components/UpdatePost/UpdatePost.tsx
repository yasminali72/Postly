import {
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { getPosts, getSinglePost } from "@/lib/Slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, appDispatch } from "@/lib/store";
import { jwtDecode } from "jwt-decode";
import { getUserPosts } from "@/lib/Slices/AuthSlice";
export default function UpdatePost({
  postId,
  bodyPost,
  setShowUpdatePost,
  imagePost,
}: {
  postId: string;
  bodyPost: string;
  setShowUpdatePost: any;
  imagePost: any;
}) {
  console.log(postId);
  console.log(localStorage.getItem("token"));

  const [newBodyPost, setNewBodyPost] = useState(bodyPost);
  const [image, setImage] = useState(null);
  const [newImageSrc, setNewImageSrc] = useState(imagePost);
  const [isLoading, setIsLoading] = useState(false);
  const { user }: any = jwtDecode(localStorage.getItem("token") ?? "");

  const dispatch = useDispatch<appDispatch>();
  useSelector((state: RootState) => state.posts);

  async function onSubmit(e: any) {
    e.preventDefault(); //prevent reload when submit
    setIsLoading(true);
    const formData = new FormData();
    formData.append("body", newBodyPost);
    if (image != null) {
      formData.set("image", image);
    } else {
      formData.delete("image");
    }
    await axios
      .put(`https://linked-posts.routemisr.com/posts/${postId}`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        console.log(data);

        if (data.message === "success") {
          setIsLoading(false);
          setShowUpdatePost(false);
          dispatch(getPosts(50));
          dispatch(getUserPosts(user));
          dispatch(getSinglePost(postId));
        }
      });
  }
  function onFileChange(e: any) {
    const imgSrc = URL.createObjectURL(e.target.files[0]);
    setNewImageSrc(imgSrc);
    setImage(e.target.files[0]);
  }
  function clearImage() {
    setImage(null);
    setNewImageSrc("");
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
      <div style={{ textAlign: "right" }}>
        <IconButton aria-label="close" onClick={() => setShowUpdatePost(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <Typography
        fontWeight={"bold"}
        fontSize={"24px"}
        mb={2}
        color={"#333"}
        textAlign={"center"}
      >
        Update a Post
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
              setNewBodyPost(e.target.value);
            }}
            value={newBodyPost}
          />

          {!newImageSrc && (
            <TextField
              variant="outlined"
              type="file"
              fullWidth
              inputProps={{ accept: "image/*" }}
              onChange={onFileChange}
              value={newImageSrc}
            />
          )}

          {newImageSrc && (
            <>
              <div style={{ textAlign: "right" }}>
                <IconButton aria-label="close" onClick={clearImage}>
                  <CloseIcon />
                </IconButton>
              </div>
              <img
                src={newImageSrc}
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
            Update{" "}
            {isLoading && (
              <CircularProgress size={20} sx={{ color: "white", ml: "5px" }} />
            )}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
