import React from "react";
import Head from "next/head";

import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Book venues of all standards in Cameroon online using Camer Event Hall" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
