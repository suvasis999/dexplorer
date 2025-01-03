import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Loading() {
  return (
    <div className="container flex flex-col gap-4">
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-24" />
    </div>
  );
}

export default Loading;
