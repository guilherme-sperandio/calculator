import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ResultsProvider } from "../hooks";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ResultsProvider>
      <Component {...pageProps} />
    </ResultsProvider>
  );
}
