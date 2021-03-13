import App from 'next/app';
import LoginLayout from '@/layouts/LoginLayout';

import 'normalize.css';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../styles/globals.scss';

// Based on https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
class MyApp extends App {
  render() {
    const {Component, pageProps, router} = this.props;

    const getLayout =
      Component.getLayout || ((page) => <LoginLayout children={page} />);

    return getLayout(<Component {...pageProps} />);
  }
}

export default MyApp;
