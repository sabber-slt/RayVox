import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link href="/manifest.json" rel="manifest" />
        <meta name="theme-color" content="#1c1917" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
