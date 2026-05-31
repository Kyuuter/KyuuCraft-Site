import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function DefaultPageSkeleton() {
  return (
    <div className="page-content-holder">
      <div className="page-content-holder">
        <Skeleton className="h-20 fake-header w-4/5" />
        <Separator />
        <div className="h-100 main-content-holder">
          <Skeleton className="h-10 fake-text-indent" />
          <Skeleton className="h-10 fake-text-full" />
          <Skeleton className="h-10 fake-text-full" />
          <Skeleton className="h-10 fake-text-full" />
          <Skeleton className="h-10 fake-text-full" />
          <Skeleton className="h-10 fake-text-full" />
          <Skeleton className="h-10 fake-text-full" />
          <Skeleton className="h-10 fake-text-full" />
          <Skeleton className="h-10 fake-text-full" />
          <Skeleton className="h-10 fake-text-full" />
          <Skeleton className="h-10 fake-text-half" />
        </div>
      </div>
    </div>
  );
}
