"use client";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  DocumentNode,
  FetchResult,
} from "@apollo/client";
import { getApiUrl } from "@/utils/api";
import {
  createAuthClient,
  handleGraphQLErrorWithToast,
} from "@/utils/auth-interceptor";

// Get Apollo client with auth interceptor
export const getClient = () => {
  return createAuthClient();
};

// Client-side query function
export const fetchQuery = async <
  T,
  V extends Record<string, unknown> = Record<string, unknown>
>(
  query: DocumentNode,
  variables?: V
): Promise<any> => {
  let data: T | undefined | null = null;
  let message: string = "";
  let loading: boolean = true;
  let success: boolean = false;

  try {
    const client = getClient();

    const result: FetchResult<T> = await client.query({
      query,
      variables,
      fetchPolicy: "network-only",
    });

    data = result?.data;
    loading = false;
    success = true;
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    message = handleGraphQLErrorWithToast(error);
    loading = false;
    success = false;
  }

  return { data, message, loading, success };
};

// Client-side mutation function
export const clientMutation = async <
  T,
  V extends Record<string, unknown> = Record<string, unknown>
>(
  mutation: DocumentNode,
  variables?: V
): Promise<any> => {
  let data: T | null = null;
  let message: string = "";
  let loading: boolean = true;
  let success: boolean = false;

  try {
    const client = getClient();

    const result: FetchResult<T> = await client.mutate<T>({
      mutation,
      variables,
    });

    data = result.data ?? null;
    loading = false;
    success = true;
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    message = handleGraphQLErrorWithToast(error);
    loading = false;
    success = false;
  }

  return { data, message, loading, success };
};
