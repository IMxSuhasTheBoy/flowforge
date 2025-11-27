import { inngest } from "@/inngest/client";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";

export const appRouter = createTRPCRouter({
  testAi: baseProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai",
    });

    return { sucess: true, message: "Queued Background job" };
  }),

  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "antonio@mail.com",
      },
    });
    // await new Promise((resolve) => setTimeout(resolve, 5_000));

    return { sucess: true, message: "Queued Background job" };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
