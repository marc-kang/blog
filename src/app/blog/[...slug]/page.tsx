import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";

interface PostPageProps {
  params: Promise<{ slug: string[] }>;
}

const canViewDrafts =
  process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview";

async function getPostFromParams(params: { slug: string[] }) {
  const slug = params.slug.join("/");
  return posts.find((post) => post.slugAsParams === slug);
}

export async function generateMetadata({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = await getPostFromParams(resolvedParams);
  if (!post || (!post.published && !canViewDrafts)) return {};

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    ...(!post.published && { robots: { index: false, follow: false } }),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${siteConfig.url}/${post.slug}`,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export function generateStaticParams() {
  return posts
    .filter((post) => post.published || canViewDrafts)
    .map((post) => ({
      slug: post.slugAsParams.split("/"),
    }));
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = await getPostFromParams(resolvedParams);

  if (!post || (!post.published && !canViewDrafts)) {
    notFound();
  }

  return (
    <article>
      <div className="space-y-4 pb-8">
        {!post.published && <Badge variant="outline">초안</Badge>}
        <h1 className="text-3xl font-bold sm:text-4xl">{post.title}</h1>
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
        {post.description && (
          <p className="text-lg text-muted-foreground">{post.description}</p>
        )}
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <MDXContent code={post.body} />
      </div>
    </article>
  );
}
