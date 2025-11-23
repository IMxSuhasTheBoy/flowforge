"use client";

import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Client } from "./client";

// leveraging prefetch in server comp & populating tanstack query client state (to start fetching faster & earlier, the client comp will be populated by server comp)
const Page = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <div className="text-3xl h-full min-h-screen min-w-screen flex items-center justify-center">
      FlowForge Studio
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>loading...</p>}>
          <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default Page;

/*
// client usage ex.
"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const trpc = useTRPC();
  const { data: users } = useQuery(trpc.getUsers.queryOptions());

  return (
    <div className="text-3xl h-full min-h-screen min-w-screen flex items-center justify-center">
      FlowForge Studio
      {JSON.stringify(users)}
    </div>
  );
};

export default Page;



// server usage ex.
import { caller } from "@/trpc/server";

const Page = async () => {
  const users = await caller.getUsers();

  return (
    <div className="text-3xl h-full min-h-screen min-w-screen flex items-center justify-center">
      FlowForge Studio
      {JSON.stringify(users)}
    </div>
  );
};

export default Page;
*/
