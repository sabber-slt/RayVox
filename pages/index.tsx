import Head from "next/head";
import Audio from "@/components/Audio";
import useToken from "@/store/useToken";
import { useEffect, useState } from "react";
import Pop from "@/components/Pop";

export default function Home() {
  const { token } = useToken();
  const [tokenValue, setTokenValue] = useState(false);
  useEffect(() => {
    if (token) {
      setTokenValue(true);
    }
  }, [token]);
  return (
    <>
      <Head>
        <title>تبدیل ویدیو به متن</title>
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <meta content="" name="description" />
        <meta property="og:url" content={`https://sabber.dev`} />
        <link rel="canonical" href={`https://sabber.dev`} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Sabber" />
        <meta property="og:description" content="" />
        <meta property="og:title" content="تبدیل ویدیو به متن" />
        <meta
          name="image"
          property="og:image"
          content="https://i.pinimg.com/564x/e7/48/cb/e748cb85be2bcade74d4d1cf98c93bc3.jpg"
        />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sabber_dev" />
        <meta name="twitter:title" content="تبدیل ویدیو به متن" />
        <meta name="twitter:description" content="تبدیل ویدیو به متن" />
        <meta
          name="twitter:image"
          content="https://i.pinimg.com/564x/e7/48/cb/e748cb85be2bcade74d4d1cf98c93bc3.jpg"
        />
      </Head>
      {!tokenValue ? <Pop /> : <Audio />}
    </>
  );
}
