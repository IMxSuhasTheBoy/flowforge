import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // Fetching the data
    await step.sleep("Fetching", "5s");

    // Transcribing the data
    await step.sleep("Transcribing", "5s");

    // Sending the transcription for summarizing (ai)
    await step.sleep("Sending-to-ai", "5s");

    await step.run("create-workflow", () => {
      return prisma.workflow.create({
        data: {
          name: "workflow-from-inngest",
        },
      });
    });
  }
);
