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

export const User = model<User>("User", UserSchema);
