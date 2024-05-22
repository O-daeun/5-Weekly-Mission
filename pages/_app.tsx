import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { UserProvider } from '@/contexts/UserContext';
import GlobalStyle from '@/styles/globals.styled';

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/signup' || pathname === '/signin';

  return (
    <UserProvider>
      <GlobalStyle />
      {!isAuthPage && <Header />}
      <Component {...pageProps} />
      {!isAuthPage && <Footer />}
    </UserProvider>
  );
}
