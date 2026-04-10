import Link from "next/link";
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
}

export function PostItem({
  slug,
  title,
  description,
  date,
  tags,
}: PostItemProps) {
  return (
    <Card className="group">
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
        <time className="text-sm text-muted-foreground">{formatDate(date)}</time>
      </CardContent>
    </Card>
  );
}
