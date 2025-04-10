"use server";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  DocumentNode,
  FetchResult,
} from "@apollo/client";
import { cookies } from "next/headers";
import newConfig from "@/utils/config";

export const getClient = async () => {
  const cookiesStore = await cookies();
  // const token = cookiesStore.get("authToken")?.value;
  const token = cookiesStore.get("idToken")?.value;

  const headers = {
    authorization: token ?? "",
    // authorization: token ? `Bearer ${token}` : "",
    "x-tz": Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: newConfig?.API_URL ?? "",
      fetch,
      headers,
    }),
    cache: new InMemoryCache(),
  });
};

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
    const client = await getClient();

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

export const Mutation = async <
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

  const client = await getClient();
  try {
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
