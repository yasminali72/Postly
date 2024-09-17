import { Comment } from "./CommentInterface";
import { User } from "./UserInterface";

export interface Post {
    _id: string;
    body: string;
    image: string;
    user: User;
    createdAt: string;
    comments: Comment[];
  }