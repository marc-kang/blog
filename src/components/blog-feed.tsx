"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LayoutList, Rows3 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

function ViewToggle({
  view,
  onChange,
}: {
  view: View;
  onChange: (view: View) => void;
}) {
  return (
    <div className="flex gap-1">
      <Button
        variant={view === "feed" ? "secondary" : "ghost"}
        size="icon"
        aria-label="Feed view"
        onClick={() => onChange("feed")}
      >
        <Rows3 />
      </Button>
      <Button
        variant={view === "list" ? "secondary" : "ghost"}
        size="icon"
        aria-label="List view"
        onClick={() => onChange("list")}
      >
        <LayoutList />
      </Button>
    </div>
  );
}

export function BlogFeed({ posts }: { posts: FeedPost[] }) {
  const [view, setView] = useState<View>("feed");
  const [showBar, setShowBar] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const headerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const articleRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(VIEW_STORAGE_KEY);
    if (stored === "feed" || stored === "list") setView(stored);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowBar(!entry.isIntersecting)
    );
    observer.observe(header);
    return () => observer.disconnect();
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

  useEffect(() => {
    if (view !== "feed") return;
    let ticking = false;
    const updateActive = () => {
      ticking = false;
      let active = -1;
      articleRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom > 80) active = i;
      });
      setActiveIndex(active);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActive);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateActive();
    return () => window.removeEventListener("scroll", onScroll);
  }, [view, visibleCount]);

  const switchView = (next: View) => {
    setView(next);
    localStorage.setItem(VIEW_STORAGE_KEY, next);
  };

  const visiblePosts = posts.slice(0, visibleCount);
  const activePost =
    view === "feed" && activeIndex >= 0 ? visiblePosts[activeIndex] : null;

  return (
    <div>
      <div
        className={`fixed inset-x-0 top-0 z-40 border-b bg-background transition-transform duration-300 ${
          showBar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-center px-6 sm:px-8">
          <div className="flex w-full max-w-[520px] items-center justify-between gap-4 py-2">
            {activePost ? (
              <div className="flex min-w-0 items-baseline gap-3">
                <span className="truncate font-bold">{activePost.title}</span>
                <time className="shrink-0 text-xs text-muted-foreground">
                  {formatDate(activePost.date)}
                </time>
              </div>
            ) : (
              <span className="font-bold">Blog</span>
            )}
            <ViewToggle view={view} onChange={switchView} />
          </div>
        </div>
      </div>

      <div
        ref={headerRef}
        className="mb-8 flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold">Blog</h1>
        <ViewToggle view={view} onChange={switchView} />
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
        <div className="space-y-6">
          {visiblePosts.map((post, index) => (
            <Card
              key={post.slug}
              ref={(el: HTMLDivElement | null) => {
                articleRefs.current[index] = el;
              }}
              className="px-6"
            >
              <article>
                <div className="space-y-3 pb-3">
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
                <div className="prose dark:prose-invert max-w-none [&_img]:-mx-6 [&_img]:my-0 [&_img]:w-[calc(100%+3rem)] [&_img]:max-w-none [&_img]:rounded-none">
                  <MDXContent code={post.body} />
                </div>
              </article>
            </Card>
          ))}
        </div>
      )}

      <div ref={sentinelRef} />
    </div>
  );
}
