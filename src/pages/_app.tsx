import "../styles/globals.css";
import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { EmotionCache } from "@emotion/react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { reduxWrapper } from "../redux/store";
import createEmotionCache from "../../src/createEmotionCache";
import PageProvider from "../styles/theme/helpers/PageProvider/PageProvider";
import { GetServerSideProps } from "next";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  // redux stuff
  const { Component, emotionCache = clientSideEmotionCache, pageProps, ...rest } = props;
  const { store } = reduxWrapper.useWrappedStore(rest);

  return (
    <PageProvider emotionCache={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Toaster toastOptions={{ duration: 5000 }} />
        <Component {...pageProps} />
      </Provider>
    </PageProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("first here");

  return {
    props: {},
  };
};

export default MyApp;
