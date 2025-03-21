import { useCallback } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

// Type for pagination response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Type for API error
export interface ApiError {
  message: string;
  statusCode: number;
}

/**
 * Generic hook for fetching data
 */
export function useFetchData<TData = unknown, TError = AxiosError<ApiError>>(
  queryKey: QueryKey,
  fetcher: () => Promise<TData>,
  options?: Omit<
    UseQueryOptions<TData, TError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<TData, TError>({
    queryKey,
    queryFn: fetcher,
    ...options,
  });
}

/**
 * Generic hook for handling paginated data
 */
export function usePaginatedData<
  TData = unknown,
  TError = AxiosError<ApiError>
>(
  resource: string,
  page: number,
  limit: number,
  fetcher: (page: number, limit: number) => Promise<PaginatedResponse<TData>>,
  options?: Omit<
    UseQueryOptions<
      PaginatedResponse<TData>,
      TError,
      PaginatedResponse<TData>,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<PaginatedResponse<TData>, TError>({
    queryKey: [resource, { page, limit }],
    queryFn: () => fetcher(page, limit),
    // Keep previous data while fetching next page (v5 uses placeholderData)
    placeholderData: (previousData) => previousData,
    ...options,
  });
}

/**
 * Generic hook for mutations with automatic cache invalidation
 */
export function useMutateData<
  TData = unknown,
  TError = AxiosError<ApiError>,
  TVariables = unknown,
  TContext = unknown
>(
  resource: string,
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  >
) {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries after successful mutation
      queryClient.invalidateQueries({ queryKey: [resource] });

      // Call the provided onSuccess if it exists
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}

/**
 * Hook for optimistic updates
 */
export function useOptimisticMutation<
  TData = unknown,
  TError = AxiosError<ApiError>,
  TVariables = unknown,
  TContext = unknown
>(
  resource: string,
  mutationFn: (variables: TVariables) => Promise<TData>,
  updateCache: (oldData: any, newVariables: TVariables) => any,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn" | "onMutate" | "onError" | "onSettled"
  >
) {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    onMutate: async (newVariables) => {
      // Cancel outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: [resource] });

      // Save previous values
      const previousData = queryClient.getQueryData([resource]);

      // Optimistically update the cache
      queryClient.setQueryData([resource], (oldData: any) =>
        updateCache(oldData, newVariables)
      );

      // Return context with the previous data
      return { previousData };
    },
    onError: (err, newVariables, context) => {
      // If mutation fails, roll back to the previous value
      if (context?.previousData) {
        queryClient.setQueryData([resource], context.previousData);
      }

      // Call the provided onError if it exists
      options?.onError?.(err, newVariables, context as TContext);
    },
    onSettled: () => {
      // Always refetch after error or success to ensure synced data
      queryClient.invalidateQueries({ queryKey: [resource] });
    },
    ...options,
  });
}

/**
 * Hook for infinite queries (e.g., infinite scrolling)
 */
export function useInfiniteScroll<
  TData = unknown,
  TError = AxiosError<ApiError>
>(
  resource: string,
  fetchPage: (
    pageParam: number
  ) => Promise<{ data: TData[]; nextPage: number | null }>,
  options?: UseQueryOptions<any, TError>
) {
  return useQuery<any, TError>({
    queryKey: [resource, "infinite"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchPage(pageParam);
      return {
        data: response.data,
        nextPage: response.nextPage,
        prevPage: pageParam > 1 ? pageParam - 1 : undefined,
      };
    },
    ...options,
  });
}

/**
 * Hook for prefetching data
 */
export function usePrefetch(resource: string, fetcher: () => Promise<any>) {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: [resource],
      queryFn: fetcher,
    });
  }, [queryClient, resource, fetcher]);
}
