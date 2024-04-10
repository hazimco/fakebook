import { useQuery } from "@tanstack/react-query";
import postsService from "../services/posts";

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
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          {post.text} by {post.user}
        </div>
      ))}
    </div>
  );
};

export default Posts;
