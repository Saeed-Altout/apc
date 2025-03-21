import { QueryClient, DefaultOptions } from "@tanstack/react-query";

// Centralized error handling function
const handleError = (error: unknown) => {
  // Log to monitoring service
  console.error("React Query Error:", error);

  // You could add additional error handling like:
  // - Sending to error reporting service like Sentry
  // - Displaying a global toast notification
  // - Redirecting to error page for critical failures
};

// Default options for all queries
const defaultQueryOptions: DefaultOptions = {
  queries: {
    // Production recommended settings
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: process.env.NODE_ENV === "production", // Only in production
    refetchOnReconnect: true,
    refetchOnMount: true,
    retry: 3, // Retry failed requests 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    onError: handleError,
  },
  mutations: {
    retry: 2,
    retryDelay: 1000,
    onError: handleError,
  },
};

// Environment-specific configurations
const getEnvironmentConfig = () => {
  if (process.env.NODE_ENV === "development") {
    return {
      queries: {
        staleTime: 1000 * 30, // 30 seconds in development
        retry: 1, // Fewer retries in development
      },
    };
  }

  return {};
};

// Create and export the QueryClient with merged configurations
export const queryClient = new QueryClient({
  defaultOptions: {
    ...defaultQueryOptions,
    ...getEnvironmentConfig(),
  },
  // Optional: Logger for debugging in development
  logger: {
    log: process.env.NODE_ENV === "development" ? console.log : () => {},
    warn: process.env.NODE_ENV === "development" ? console.warn : () => {},
    error: console.error,
  },
});

// Utility to clear cache related to a specific entity
export const invalidateEntity = async (entityName: string) => {
  await queryClient.invalidateQueries({ queryKey: [entityName] });
};

// Utility for optimistic updates
export const optimisticUpdate = <T>(
  queryKey: string[],
  updateFn: (oldData: T) => T
) => {
  queryClient.setQueriesData({ queryKey }, (oldData: T | undefined) => {
    return oldData ? updateFn(oldData) : oldData;
  });
};

// Utility to pre-populate cache
export const prefetchQuery = async <T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options = {}
) => {
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    ...options,
  });
};

// Re-export for convenient imports
export * from "@tanstack/react-query";
