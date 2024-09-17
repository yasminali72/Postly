"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CommentIcon from "@mui/icons-material/Comment";
import { Post as PostInterface } from "@/Interfaces/PostInterface";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import CreateComment from "../CreateComment/CreateComment";
import { getPosts, getSinglePost } from "@/lib/Slices/postsSlice";
import { RootState, appDispatch } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "@/lib/Slices/AuthSlice";
import { jwtDecode } from "jwt-decode";
import UpdatePost from "../UpdatePost/UpdatePost";
import UpdateComment from "../UpdateComment/UpdateComment";

export default function Post({
  post,
  showAllComments = false,
}: {
  post: PostInterface;
  showAllComments?: boolean;
}) {
  const [showPhoto, setShowPhoto] = React.useState<boolean>(false);
  const [userComment, setUserComment] = React.useState<boolean>(false);
  const [ShowUpdatePost, setShowUpdatePost] = React.useState<boolean>(false);
  const [ShowUpdateComment, setShowUpdateComment] =
    React.useState<boolean>(false);
  const [commentId, setCommentId] = React.useState("");
  const [bodyComment, setBodyComment] = React.useState("");
  const router = useRouter();
  const { user }: any = jwtDecode(localStorage.getItem("token") ?? "");

  const dispatch = useDispatch<appDispatch>();
  let { singlePost } = useSelector((state: RootState) => state.posts);
  const [postMenuAnchorEl, setPostMenuAnchorEl] =
    React.useState<null | HTMLElement>(null); // For post settings menu

  const postMenuOpen = Boolean(postMenuAnchorEl);

  // Post menu handlers
  const handlePostMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPostMenuAnchorEl(event.currentTarget);
  };

  const handlePostMenuClose = () => {
    setPostMenuAnchorEl(null);
  };

  // delete comment
  async function deleteComment(commentId: string) {
    console.log(localStorage.getItem("token"));

    console.log(commentId);
    let { data } = await axios.delete(
      `https://linked-posts.routemisr.com/comments/${commentId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (data.message === "success") {
      dispatch(getSinglePost(post._id));
      dispatch(getPosts(50));
      dispatch(getUserPosts(user));
    }
  }

  // delete post
  async function deletePost(postId: string) {
    let { data } = await axios.delete(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (data.message === "success") {
      dispatch(getSinglePost(post._id));
      dispatch(getPosts(50));
      dispatch(getUserPosts(user));
    }
  }

  return (
    <Card key={post._id} sx={{ mt: "20px", width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], cursor: "pointer" }}
            aria-label="recipe"
          >
            <Image
              height={50}
              width={50}
              src={post.user.photo}
              alt={post.user.name}
            ></Image>
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handlePostMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={postMenuAnchorEl}
              open={postMenuOpen}
              onClose={handlePostMenuClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                onClick={() => {
                  handlePostMenuClose();
                  setShowUpdatePost(true);
                }}
              >
                Update
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handlePostMenuClose();
                  deletePost(post._id);
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </>
        }
        title={post.user.name}
        subheader={post.createdAt}
        titleTypographyProps={{
          fontWeight: "bold",
          fontSize: "16px",
          style: { cursor: "pointer" },
        }}
      />
      <CardContent>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            pl: "10px",
            wordBreak: "break-word", // Break long words to fit
            whiteSpace: "pre-wrap", // Preserve white spaces and line breaks
          }}
        >
          {post.body}
        </Typography>
      </CardContent>
      {post.image && (
        <CardMedia
          component="img"
          height="300"
          image={post.image}
          alt={post.user.photo}
          sx={{ cursor: "pointer", objectFit: "contain" }}
          onClick={() => setShowPhoto(true)}
        />
      )}
      {showPhoto && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 4,
            overflow: "hidden",
          }}
          onClick={() => {
            setShowPhoto(false);
          }}
        >
          <IconButton
            aria-label="close"
            sx={{ color: "white", position: "absolute", top: 70, right: 0 }}
          >
            <CloseIcon />
          </IconButton>
          <CardMedia
            component="img"
            image={post.image}
            alt={post.user.photo}
            sx={{
              cursor: "pointer",
              objectFit: "contain",
              objectPosition: "center",
              maxWidth: "60vw",
              maxHeight: "90vh",
              mt: "60px",
              zIndex: 4,
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid gray",
          borderTop: "1px solid gray",
          mt: "20px",
        }}
      >
        <IconButton aria-label="like">
          <ThumbUpOffAltIcon />
        </IconButton>
        <IconButton aria-label="comment" onClick={() => setUserComment(true)}>
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>

      {userComment && <CreateComment postId={post._id} />}
      {!showAllComments && post.comments[0] && (
        <Box
          key={post.comments[0]._id}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "start",
            m: "10px",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500], cursor: "pointer" }}
                aria-label="recipe"
              >
                <Image
                  height={30}
                  width={30}
                  src={post.comments[0].commentCreator.photo}
                  alt={post.comments[0].commentCreator.name.charAt(0)}
                ></Image>
              </Avatar>
            }
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <CardContent
                style={{
                  backgroundColor: "#Eee",
                  borderRadius: "5px",
                  marginBottom: "5px",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                <Typography>{post.comments[0].commentCreator.name}</Typography>
                <Typography>{post.comments[0].createdAt}</Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", pl: "10px" }}
                >
                  {post.comments[0].content}
                </Typography>
              </CardContent>
            </div>
            <div style={{ display: "flex" }}>
              <p
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => {
                  setShowUpdateComment(true);
                  setBodyComment(post.comments[0].content);
                  setCommentId(post.comments[0]._id);
                }}
              >
                Update
              </p>
              <strong style={{ marginLeft: "5px", marginRight: "5px" }}>
                |
              </strong>
              <p
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => deleteComment(post.comments[0]._id)}
              >
                delete
              </p>
            </div>
          </div>
        </Box>
      )}
      {!showAllComments && post.comments[1] && (
        <Typography
          variant="h6"
          onClick={() => router.push("postDetails/" + post._id)}
          sx={{
            color: "blue",
            textAlign: "center",
            width: "100%",
            ":hover": { textDecorationLine: "underline" },
          }}
        >
          See more comments
        </Typography>
      )}

      {showAllComments &&
        post.comments.map((comment) => {
          return (
            <Box
              key={comment._id}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "start",
                m: "10px",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500], cursor: "pointer" }}
                    aria-label="recipe"
                  >
                    <Image
                      height={30}
                      width={30}
                      src={comment.commentCreator.photo}
                      alt={comment.commentCreator.name.charAt(0)}
                    ></Image>
                  </Avatar>
                }
              />

              <div
                style={{
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#Eee",
                    borderRadius: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <CardContent>
                    <Typography>{comment.commentCreator.name}</Typography>
                    <Typography>{comment.createdAt}</Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.secondary",
                        pl: "10px",
                        wordBreak: "break-word", // Break long words to fit
                        whiteSpace: "pre-wrap", // Preserve white spaces and line breaks
                      }}
                    >
                      {comment.content}
                    </Typography>
                  </CardContent>
                </div>

                <div style={{ display: "flex" }}>
                  <p
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => {
                      setShowUpdateComment(true);
                      setBodyComment(comment.content);
                      setCommentId(comment._id);
                    }}
                  >
                    Update
                  </p>
                  <strong style={{ marginLeft: "5px", marginRight: "5px" }}>
                    |
                  </strong>
                  <p
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => deleteComment(comment._id)}
                  >
                    delete
                  </p>
                </div>
              </div>
            </Box>
          );
        })}

      {ShowUpdatePost && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ position: "absolute", width: "80%" }}>
            <UpdatePost
              postId={post._id}
              bodyPost={post.body}
              setShowUpdatePost={setShowUpdatePost}
              imagePost={post.image}
            />
          </div>
        </div>
      )}

      {ShowUpdateComment && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "70%",
              backgroundColor: "white",
            }}
          >
            <UpdateComment
              commentId={commentId}
              postId={post._id}
              setShowUpdateComment={setShowUpdateComment}
              bodyComment={bodyComment}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
