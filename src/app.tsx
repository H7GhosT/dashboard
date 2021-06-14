import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import { PageSwitch } from "./features/page-switch";
import { UserContextProvider } from "./user-context";

const client = new QueryClient();

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <UserContextProvider>
          <PageSwitch />
        </UserContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
