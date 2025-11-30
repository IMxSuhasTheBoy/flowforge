import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

// customers state of subscription
export const useSubscription = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const { data } = await authClient.customer.state();
      return data;
    },
  });
};

// hook for client side (relying on refresh refetching) (on backend we can use await for fetching this)
export const useHasActiveSubscription = () => {
  const { data: customerState, isLoading, ...rest } = useSubscription();

  const hasActiveSubscription =
    customerState?.activeSubscriptions &&
    customerState.activeSubscriptions.length > 0; // alternate : look through the active subscriptions id for specific one to verify

  return {
    hasActiveSubscription,
    subscription: customerState?.activeSubscriptions?.[0],
    isLoading,
    ...rest,
  };
};

// prisma internal db id is transferred with polar external db id
