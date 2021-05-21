import "../styles/globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */
import "@fortawesome/fontawesome-svg-core/styles.css";

import type { AppProps } from "next/app";
import Layout from "../components/Layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default App;
