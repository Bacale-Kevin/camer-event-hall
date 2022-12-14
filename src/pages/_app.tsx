import "../styles/globals.css";
import React, { useEffect } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { EmotionCache } from "@emotion/react";
import { Toaster } from "react-hot-toast";
import { AppDispatch, reduxWrapper } from "../redux/store";
import createEmotionCache from "../../src/createEmotionCache";
import PageProvider from "../styles/theme/helpers/PageProvider/PageProvider";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { getLoggedInUser } from "../redux/features/auth/authActions";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  // redux stuff
  const { Component, emotionCache = clientSideEmotionCache, pageProps, ...rest } = props;

  /*** On Every Route Change Get The LoggedIn User ****/
  useEffect(() => {
    if (router.pathname === "/") {
      const fetchAuthUser = async () => {
        await dispatch(getLoggedInUser());
      };
      fetchAuthUser();
    }
  }, [router.pathname]);

  return (
    <PageProvider emotionCache={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Toaster toastOptions={{ duration: 5000 }} />
      <Component {...pageProps} />
    </PageProvider>
  );
}

export default reduxWrapper.withRedux(MyApp);
