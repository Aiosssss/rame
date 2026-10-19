import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="id" className="js">
      <Head>
        <link
          rel="preload"
          as="image"
          imageSrcSet="/assets/step-search-128.webp 128w, /assets/step-search-192.webp 192w, /assets/step-search-256.webp 256w, /assets/step-search.webp 512w"
          imageSizes="100px"
          media="(max-width: 700px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/assets/urbanist-core.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/roboto-core.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
