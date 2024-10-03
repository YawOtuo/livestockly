"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { Provider } from "react-redux";
import {store} from "../redux/store";
import useAuthState from "../hooks/useAuthState";
import { auth } from "../hooks/firebase";

function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  useAuthState(auth)

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
