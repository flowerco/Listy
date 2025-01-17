import { Schema, model } from "mongoose";
import { UserType } from "./customTypes";

const UserSchema = new Schema<UserType>(
  {
    username: String,
    email: String, 
    password: String,
    followers: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
  },
);

export const User = model<UserType>("User", UserSchema);
