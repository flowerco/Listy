import { Schema, model } from "mongoose";

interface User {
  _id: string;
  followers: [];
  following: [];
}

const UserSchema = new Schema<User>(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    followers: {
      type: [],
      default: [],
    },
    following: {
      type: [],
      default: [],
    },
  },
  { _id: false }
);

export const User = model<User>("User", UserSchema);
