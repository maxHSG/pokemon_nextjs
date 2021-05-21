import Head from "next/head";
import { QueryClientProvider, QueryClient } from "react-query";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const client = new QueryClient();

const Layout = ({ children }: LayoutProps) => {
  return (
    <QueryClientProvider client={client}>
      <div>
        <Head>
          <title>Pokemon</title>
          <meta name="description" content="Lista de Pokemons" />
          <link rel="icon" href="/favicon.ico" />
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>

        <main className="overflow-hidden">{children}</main>

        {/* <Footer /> */}
      </div>
    </QueryClientProvider>
  );
};

export default Layout;
