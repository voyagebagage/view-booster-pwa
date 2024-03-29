import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-512x512.png"></link>
        <meta name="theme-color" content="#282c34" />
      </Head>
      {/* <title>View Booster PWA</title> */}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// export default MyDocument;
