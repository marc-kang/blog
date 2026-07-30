import { posts } from "#site/content";
import { sortPosts } from "@/lib/utils";
import { BlogFeed } from "@/components/blog-feed";

export const metadata = {
  title: "Blog",
  description: "All blog posts",
};

export default function BlogPage() {
  const sortedPosts = sortPosts(posts.filter((post) => post.published));

  return (
    <BlogFeed
      posts={sortedPosts.map((post) => ({
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        tags: post.tags,
        cover: post.cover,
        body: post.body,
      }))}
    />
  );
}
