import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import "@/utils/loading-pages/skeleton.css";

export default function SkeletonCard() {
  return (
    <Card className="project-cell">
      <CardHeader>
        <Skeleton className="h-10 fake-header" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 fake-text-full" />
        <Skeleton className="h-4 fake-text-full" />
        <Skeleton className="h-4 fake-text-full" />
        <Skeleton className="h-4 fake-text-half" />
      </CardContent>
      <CardFooter>
        <Skeleton className="flex h-10 w-2/3" />
      </CardFooter>
    </Card>
  );
}
