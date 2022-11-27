import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ResultsProvider } from "../hooks";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ResultsProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </ResultsProvider>
  );
}
