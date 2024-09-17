"use client";
import { Post as PostInterface } from "@/Interfaces/PostInterface";
import Loading from "@/app/_Components/(Loading)/Loading";
import Post from "@/app/_Components/Post/Post";
import { getPosts } from "@/lib/Slices/postsSlice";
import { RootState, appDispatch } from "@/lib/store";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "@/app/_Components/CreatePost/CreatePost";
import { useRouter } from "next/navigation";
export default function Home() {
  const dispatch = useDispatch<appDispatch>();
  let { posts, isLoading }: { posts: PostInterface[]; isLoading: boolean } =
    useSelector((state: RootState) => state.posts);
  const router = useRouter();
  console.log(localStorage.getItem("token"));

  if (!localStorage.getItem("token")) {
    router.push("/Login");
  }
  useEffect(() => {
    dispatch(getPosts(50));
  }, []);

  return (
    <>
      <head>
        <title>Postly</title>
      </head>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <CreatePost />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </Container>
      {isLoading && <Loading />}
    </>
  );
}
