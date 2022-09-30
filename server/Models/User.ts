import { Schema, model } from "mongoose";
import { UserType } from "./customTypes";

const UserSchema = new Schema<UserType>(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
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
  { _id: false }
);

export const User = model<UserType>("User", UserSchema);
