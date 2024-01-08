import React, { useState } from "react";
import "../public/styles/globals.css";
import type { AppProps } from "next/app";
import { OverlayProvider } from "@toss/use-overlay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Head from "next/head";
import { SessionProvider, useSession } from "next-auth/react";
import RefreshTokenHandler from "../features/auth/RefreshTokenHandler";
import { NextComponentType, NextPageContext } from "next";
import AuthContainer from "@/auth/AuthContainer";

export interface AuthInfo {
  role?: "user" | "member";
  loading?: React.ReactNode;
  redirect?: string;
}

interface AuthEnabledComponentConfig {
  auth: AuthInfo;
}

type NextComponentWithAuth = NextComponentType<NextPageContext, any, {}> &
  Partial<AuthEnabledComponentConfig>;

interface MyAppProps extends AppProps {
  Component: NextComponentWithAuth;
}

const ALLOWED_ONLY_FOR_MEMBERS = ["/logi"];

export const queryClient = new QueryClient();

export const QueryClientWrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default function MyApp({
  Component,
  pageProps: {  ...pageProps },
  router: { route },
}: MyAppProps) {
  const [sessionRefetchInterval, setSessionRefetchInterval] = useState(10000);
  const memberRequireAuth = ALLOWED_ONLY_FOR_MEMBERS.some((path) =>
    route.startsWith(path)
  );
  // const session = 

  const renerAuthorizedComponent = () => {
    if (memberRequireAuth) {
      const authInfo: AuthInfo = {
        role: "member",
        redirect: Component.auth?.redirect,
        loading: Component.auth?.loading,
      };
      return (
        <AuthContainer authInfo={authInfo}>
          <Component {...pageProps} />
        </AuthContainer>
      );
    }
    return <Component {...pageProps} />;
  };

  return (
    <>
      <Head>
        <title>Dear New Year</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta charSet="utf-8"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider
        session={pageProps.session}
        refetchInterval={sessionRefetchInterval}
      >
        <QueryClientProvider client={queryClient}>
          <OverlayProvider>{renerAuthorizedComponent()}</OverlayProvider>
          <RefreshTokenHandler
            setSessionRefetchInterval={setSessionRefetchInterval}
          />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
