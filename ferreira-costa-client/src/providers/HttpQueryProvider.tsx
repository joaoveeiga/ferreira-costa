import React, { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const HttpQueryProvider = ({ children }) => {
  const client = useMemo(() => new QueryClient(), []);
  const config = { client, children };

  return <QueryClientProvider {...config} />;
};
