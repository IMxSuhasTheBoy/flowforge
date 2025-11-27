"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { LogoutButton } from "./logout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("Queued Ai job");
      },
    })
  );

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Queued Background job");
      },
    })
  );

  return (
    <div className="flex-col gap-y-6 text-3xl h-full min-h-screen min-w-screen flex items-center justify-center">
      protected server component test
      <div>{JSON.stringify(data, null, 2)}</div>
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        Test Ai
      </Button>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create workflow
      </Button>
      <LogoutButton />
    </div>
  );
};

export default Page;

/*
// auth session test
"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const Page = () => {
  const { data } = authClient.useSession();

  return (
    <div className="text-3xl h-full min-h-screen min-w-screen flex items-center justify-center">
      {JSON.stringify(data)}
      {data && <Button onClick={() => authClient.signOut()}>Logout</Button>}
    </div>
  );
};

export default Page;


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
