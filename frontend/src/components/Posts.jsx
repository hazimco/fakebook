import { useQuery } from "@tanstack/react-query";
import postsService from "../services/posts";
import Post from "./Post";

const Posts = () => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: postsService.getAll,
  });

  if (query.isPending) return <div>loading</div>;
  if (query.isError) return <div>could not fetch posts</div>;

  const posts = query.data;

  return (
    <div>
      {/* currently renders with a "blink" when isPending is true. Need to always render the heading */}
      <h1>Posts</h1>{" "}
      {posts.map((post) => {
        console.log("post", post);
        return (
          <div key={post.id}>
            <Post
              text={post.text}
              createdAt={post.createdAt}
              username={post.user.username}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
