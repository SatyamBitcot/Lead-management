"use client";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  DocumentNode,
  FetchResult,
} from "@apollo/client";
import { getApiUrl } from "@/utils/api";

// Create Apollo client with auth token from localStorage
export const getClient = () => {
  // Get auth token from localStorage (client-side only)
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("accessToken") || "";
  }

  const headers = {
    authorization: token ? `Bearer ${token}` : "",
    "x-tz": Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  return new ApolloClient({
    ssrMode: false,
    link: new HttpLink({
      uri: getApiUrl(),
      headers,
    }),
    cache: new InMemoryCache(),
  });
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
    if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }
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
    if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }
    loading = false;
    success = false;
  }

  return { data, message, loading, success };
};
