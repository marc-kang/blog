import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  cover?: string;
}

export function PostItem({
  slug,
  title,
  description,
  date,
  tags,
  cover,
}: PostItemProps) {
  return (
    <Card className="group">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <CardHeader>
            <CardTitle>
              <Link href={`/${slug}`} className="hover:underline">
                {title}
              </Link>
            </CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <time className="text-sm text-muted-foreground">
              {formatDate(date)}
            </time>
          </CardContent>
        </div>
        {cover && (
          <Link
            href={`/${slug}`}
            className="relative mr-6 block size-24 shrink-0 overflow-hidden rounded-md"
          >
            <Image
              src={cover}
              alt={title}
              fill
              sizes="6rem"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        )}
      </div>
    </Card>
  );
}
