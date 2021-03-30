import React from 'react';
import Head from 'next/head';
import {getLayout} from '@/layouts/LoginLayout';
import {Login} from '@/components/TheLogin';

const HomePage = () => (
  <>
    <Head>
      <title>Home - login</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Login />
  </>
);

HomePage.getLayout = getLayout;
export default HomePage;
