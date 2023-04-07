import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { getCookie, setCookie } from 'cookies-next';
import { NotificationsProvider } from '@mantine/notifications';
import { DataStateProvider } from '../utils/dataState';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <DataStateProvider>
            <Component {...pageProps} />
          </DataStateProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});
