export interface PostType {
  userId: string;
  name: string;
  rating: string;
  genre: string;
  image: string;
  likes: [string];
}

export interface UserType {
  _id: string;
  email: string;
  password: string;
  followers: [];
  following: [];
}
