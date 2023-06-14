import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { ReactElement, useEffect } from "react";
import { RootLayout } from "~/components/layout/RootLayout";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionData && sessionData.user) {
      void router.push("/dashboard");
    }
  }, [sessionData]);

  return (
    <>
      <Head>
        <title>Avocado Shop</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">Admin Log in</p>
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={() => void signIn("google")}
            >
              Sign in
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default Home;
