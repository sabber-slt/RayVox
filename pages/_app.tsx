import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const inter = localFont({
  src: [
    {
      path: "../public/IRANSansXV.woff",
      style: "normal",
    },
  ],
  display: "swap",
});

export const theme = extendTheme({
  itialColorMode: "light",
  useSystemColorMode: false,

  styles: {
    global: {
      body: {
        bg: "#fff",
        color: "#2D3748",
      },
    },
  },
  fonts: {
    body: inter.style.fontFamily,
    heading: inter.style.fontFamily,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
