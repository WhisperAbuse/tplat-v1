import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

import Navbar from '@/shared/Navbar';

import { UserContext } from '@/lib/context';
import { useUserData } from '@/lib/hooks';

import '@/styles/globals.scss';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: ['Inter', 'Roboto', 'sans-serif'].join(','),
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={userData}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
