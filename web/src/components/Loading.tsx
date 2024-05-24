import { Skeleton } from "./ui/skeleton";
import { LoaderCircle } from "lucide-react";

export function Loading() {
  return(
    <Skeleton className="h-80 rounded-md flex items-center justify-center">
      <LoaderCircle className="size-5 animate-spin"/>
    </Skeleton>
  );
}