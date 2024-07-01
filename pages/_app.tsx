import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { UserProvider } from '@/contexts/UserContext';
import GlobalStyle from '@/styles/globals.styled';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FolderIdProvider } from '@/contexts/folderIdContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ModalProvider } from '@/contexts/ModalContext';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/signup' || pathname === '/signin';

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <UserProvider>
          <GlobalStyle />
          {!isAuthPage && <Header />}
          <FolderIdProvider>
            <Component {...pageProps} />
          </FolderIdProvider>
          {!isAuthPage && <Footer />}
        </UserProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ModalProvider>
    </QueryClientProvider>
  );
}
