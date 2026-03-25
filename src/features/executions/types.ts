import type { GetStepTools, Inngest } from "inngest";
import type { Realtime } from "@inngest/realtime";

export type WorkflowContext = Record<string, unknown>;

export type StepTools = GetStepTools<Inngest.Any>;

/**
 * Data to be passed: Type depends on the node (dynamic)
 * HttpRequest node: { endpoint, body, method }
 * OpenAI node/Anthropic: sys prompts/user promprs, model
 *
 * context: Type depends on the node: context expands as each node progresses,
 * We will be able to use the context of the previus node into the next node.
 * Nodes returned values could be JSON, string, points to an API, error
 */
export interface NodeExecutorParams<TData = Record<string, unknown>> {
  data: TData;
  nodeId: string;
  userId: string;
  context: WorkflowContext;
  step: StepTools;
  publish: Realtime.PublishFn;
}

export type NodeExecutor<TData = Record<string, unknown>> = (
  params: NodeExecutorParams<TData>
) => Promise<WorkflowContext>;
