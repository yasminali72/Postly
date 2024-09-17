'use client'
import Loading from "@/app/_Components/(Loading)/Loading"
import Post from "@/app/_Components/Post/Post"
import { getSinglePost } from "@/lib/Slices/postsSlice"
import { RootState, appDispatch } from "@/lib/store"
import { Container, IconButton } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {Button} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function PostDetails({params:{postId} } :{params:{postId:string}}) {
  const router=useRouter()
  const dispatch=useDispatch<appDispatch>()
let {singlePost,isError}=useSelector((state:RootState)=>state.posts)

  useEffect(()=>{
dispatch(getSinglePost(postId))
  },[])
  
  if(singlePost ==null){
    return <div style={{height:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
       <Button variant="contained" onClick={()=>router.push('/')} sx={{textTransform:'capitalize',}}>
        <IconButton >
        <ArrowBackIcon sx={{color:'white'}}/>
        </IconButton>
        Back to home</Button>
      <Loading/></div>
   
  }
  
  return (
    
   <>
   <head>
    <title>Post Details</title>
   </head>
   <Container maxWidth='md'>
      <Button variant="contained" onClick={()=>router.push('/')} sx={{textTransform:'capitalize'}}>
        <IconButton >
        <ArrowBackIcon sx={{color:'white'}}/>
        </IconButton>
        Back to home</Button>
<Post post={singlePost} showAllComments={true} key={postId}/>

    </Container>
   </>
  )
}


