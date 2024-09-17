import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import Image from "next/image";
import { Box, Stack, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useState } from "react";
import { getPosts, getSinglePost } from "@/lib/Slices/postsSlice";
import { RootState, appDispatch } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { getUserPosts } from "@/lib/Slices/AuthSlice";

export default function CreateComment({ postId }: { postId: string }) {
  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState("");
  const { user }: any = jwtDecode(localStorage.getItem("token") ?? "");

  const dispatch = useDispatch<appDispatch>();
  let { singlePost, posts } = useSelector((state: RootState) => state.posts);

  async function addCommit(e: any) {
    e.preventDefault(); //prevent reload when submit
    await axios
      .post(
        "https://linked-posts.routemisr.com/comments",
        { content: comment, post: postId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => {
        if (data.message === "success") {
          setComment("");
          setIsError("");
          dispatch(getSinglePost(postId));
          dispatch(getPosts(50));
          dispatch(getUserPosts(user));
        }
      })
      .catch(({ response }) => {
        setIsError(response.data.error);
      });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "start",
        m: "10px",
        width: "100%",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], cursor: "pointer" }}
            aria-label="recipe"
          >
            <Image height={30} width={30} src="" alt="" />
          </Avatar>
        }
      />

      <form onSubmit={addCommit} style={{ width: "100%" }}>
        <Stack>
          <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
            <CardContent
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              <TextField
                fullWidth
                multiline
                placeholder="Write a comment..."
                sx={{ mr: 1 }}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                value={comment}
              />
              <IconButton color="primary" aria-label="send" type="submit">
                <SendIcon />
              </IconButton>
            </CardContent>
          </Stack>
          {isError && <Typography color="red">{isError}</Typography>}
        </Stack>
      </form>
    </Box>
  );
}
