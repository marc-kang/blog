import { posts } from "#site/content";
import { sortPosts } from "@/lib/utils";
import { PostItem } from "@/components/post-item";

export const metadata = {
  title: "Blog",
  description: "All blog posts",
};

export default function BlogPage() {
  const sortedPosts = sortPosts(posts.filter((post) => post.published));

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Blog</h1>
      {sortedPosts.length > 0 ? (
        <ul className="space-y-4">
          {sortedPosts.map((post) => (
            <li key={post.slug}>
              <PostItem
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No posts yet.</p>
      )}
    </div>
  );
}
