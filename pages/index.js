import Head from 'next/head';
import dynamic from 'next/dynamic';

const Game = dynamic(() => import('../components/Game'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Word Search</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="description" content="Ad-free word search game with 6969 levels" />
      </Head>
      <Game />
    </>
  );
}
