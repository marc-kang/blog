import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";

interface PostPageProps {
  params: Promise<{ slug: string[] }>;
}

async function getPostFromParams(params: { slug: string[] }) {
  const slug = params.slug.join("/");
  return posts.find((post) => post.slugAsParams === slug);
}

export async function generateMetadata({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = await getPostFromParams(resolvedParams);
  if (!post) return {};

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
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
  return posts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = await getPostFromParams(resolvedParams);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-4xl px-4 py-10">
      <div className="space-y-4 pb-8">
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
