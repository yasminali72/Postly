import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import Image from "next/image";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { getPosts, getSinglePost } from "@/lib/Slices/postsSlice";
import { appDispatch } from "@/lib/store";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { getUserPosts } from "@/lib/Slices/AuthSlice";

export default function UpdateComment({
  commentId,
  setShowUpdateComment,
  bodyComment,
  postId,
}: {
  commentId: string;
  bodyComment: string;
  postId: string;
  setShowUpdateComment: any;
}) {
  const [comment, setComment] = useState(bodyComment);
  const [isError, setIsError] = useState("");
  const { user }: any = jwtDecode(localStorage.getItem("token") ?? "");

  const dispatch = useDispatch<appDispatch>();

  async function updateComment(e: any) {
    console.log(comment);

    e.preventDefault();
    await axios
      .put(
        `https://linked-posts.routemisr.com/comments/${commentId}`,
        { content: comment },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
        if (data.message === "success") {
          setIsError("");
          setShowUpdateComment(false);
          dispatch(getPosts(50));
          dispatch(getUserPosts(user));
          dispatch(getSinglePost(postId));
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

      <form onSubmit={updateComment} style={{ width: "100%" }}>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <CardContent
            sx={{ width: "100%", display: "flex", alignItems: "center" }}
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
          </CardContent>
          {isError && <Typography color="red">{isError}</Typography>}

          <Stack direction={"row"} spacing={3}>
            <Button variant="contained" sx={{ width: "60px" }} type="submit">
              Update
            </Button>
            <Button
              variant="contained"
              sx={{ width: "60px", backgroundColor: "gray" }}
              onClick={() => setShowUpdateComment(false)}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}
