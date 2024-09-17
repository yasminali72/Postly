import { User } from "./UserInterface";

export interface Comment {
    _id: string;
    content: string;
    commentCreator: User;
    post: string;
    createdAt: string;
  }