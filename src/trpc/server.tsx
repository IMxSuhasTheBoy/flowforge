import "server-only"; // <-- ensure this file cannot be imported from the client
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { cache } from "react";
import { createTRPCContext } from "./init";
import { makeQueryClient } from "./query-client";
import { appRouter } from "./routers/_app";
// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});

// on client: we use useQuery, useMutation & calls the trpc procedure.
// on server:
// we use caller instance of trpc for the server comp.
// this allows us to call the trpc data access layer through a server comp.
// this server caller also preserves the auth session
export const caller = appRouter.createCaller(createTRPCContext);
