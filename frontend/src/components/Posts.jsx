import { useQuery } from "@tanstack/react-query";
import postsService from "../services/posts";
import Post from "./Post";
import PostForm from "./PostForm";

const Posts = () => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: postsService.getAll,
  });

  if (query.isPending) return <div>loading</div>;
  if (query.isError) return <div>could not fetch posts</div>;

  const posts = query.data;

  const sortedPosts = [...posts].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div>
      {/* currently renders with a "blink" when isPending is true. Need to always render the heading */}
      <h1>Posts</h1>
      <PostForm />
      {sortedPosts
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((post) => {
          return (
            <Post
              key={post.id}
              text={post.text}
              createdAt={post.createdAt}
              username={post.user.username}
              id={post.id}
            />
          );
        })}
    </div>
  );
};

export default Posts;
