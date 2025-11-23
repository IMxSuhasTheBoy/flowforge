import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";

const Page = async () => {
  await requireAuth();

  const data = await caller.getUsers();

  return (
    <div className="flex-col gap-y-6 text-3xl h-full min-h-screen min-w-screen flex items-center justify-center">
      protected server component test
      <div>{JSON.stringify(data, null, 2)}</div>
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
