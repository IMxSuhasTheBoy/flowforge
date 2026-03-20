"use server";

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { anthropicChannel } from "@/inngest/channels/anthropic";

// Refresh token method for realtime inngest bg job status
export type AnthropicToken = Realtime.Token<typeof anthropicChannel, ["status"]>;

export async function fetchAnthropicRealtimeToken(): Promise<AnthropicToken> {
  const token = await getSubscriptionToken(inngest, {
    channel: anthropicChannel(),
    topics: ["status"],
  });

  return token;
}
