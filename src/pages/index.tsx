import Head from "next/head";
import { RameSite } from "@/components/RameSite";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Rame — Satu tiket, banyak cerita.</title>
        <meta
          name="description"
          content="Rame — Satu tiket, banyak cerita. Temukan konser, festival, workshop, dan komedi favoritmu."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3015ff" />
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
      </Head>
      <RameSite />
    </>
  );
}
