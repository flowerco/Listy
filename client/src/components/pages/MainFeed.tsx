import { ReactElement } from "react";
import { useState, useEffect } from "react";
import { fetchPosts } from "../../utils/MainFeedServices";
import { PostObj } from "../../../customTypes";

export const MainFeed = (): ReactElement => {
  const [posts, setPosts] = useState([] as PostObj[]);

  useEffect(() => {
    fetchPosts().then((res) => setPosts(res));
  }, []);

  return (
    <main>
      <h1 className="mainfeed-title">MainFeed</h1>
      <section className="posts-container">
        {posts.map((post) => (
          <div className="image-and-post" key={post._id.toString()}>
            <img className="post-image" src={post.image} />
            <section className="post-container">
              <h1 className="post-name">{post.name}</h1>
              <p className="post-rating">{post.rating}</p>
              <p className="post-genre">{post.genre}</p>
            </section>
          </div>
        ))}
      </section>
    </main>
  );
};
