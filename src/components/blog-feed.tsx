"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LayoutList, Rows3 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MDXContent } from "@/components/mdx-components";
import { PostItem } from "@/components/post-item";

interface FeedPost {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  cover?: string;
  body: string;
}

const PAGE_SIZE = 5;
const VIEW_STORAGE_KEY = "blog-view";

type View = "feed" | "list";

export function BlogFeed({ posts }: { posts: FeedPost[] }) {
  const [view, setView] = useState<View>("feed");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(VIEW_STORAGE_KEY);
    if (stored === "feed" || stored === "list") setView(stored);
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((count) => Math.min(count + PAGE_SIZE, posts.length));
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [posts.length]);

  const switchView = (next: View) => {
    setView(next);
    localStorage.setItem(VIEW_STORAGE_KEY, next);
  };

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <div>
      <div className="sticky top-14 z-40 -mx-4 mb-8 flex items-center justify-between bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <h1 className="text-3xl font-bold">Blog</h1>
        <div className="flex gap-1">
          <Button
            variant={view === "feed" ? "secondary" : "ghost"}
            size="icon"
            aria-label="Feed view"
            onClick={() => switchView("feed")}
          >
            <Rows3 />
          </Button>
          <Button
            variant={view === "list" ? "secondary" : "ghost"}
            size="icon"
            aria-label="List view"
            onClick={() => switchView("list")}
          >
            <LayoutList />
          </Button>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet.</p>
      ) : view === "list" ? (
        <ul className="space-y-4">
          {visiblePosts.map((post) => (
            <li key={post.slug}>
              <PostItem
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                cover={post.cover}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-12">
          {visiblePosts.map((post) => (
            <article
              key={post.slug}
              className="border-b pb-12 last:border-b-0"
            >
              <div className="space-y-3 pb-6">
                <h2 className="text-2xl font-bold">
                  <Link href={`/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <div className="flex items-center gap-4">
                  <time className="text-sm text-muted-foreground">
                    {formatDate(post.date)}
                  </time>
                  <div className="flex gap-2">
                    {post.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <MDXContent code={post.body} />
              </div>
            </article>
          ))}
        </div>
      )}

      <div ref={sentinelRef} />
    </div>
  );
}
