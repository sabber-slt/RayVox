import { AudioManager } from "@/components/AudioManager";
import Transcript from "@/components/Transcript";
import { useTranscriber } from "@/hooks/useTranscriber";
import Link from "next/link";

export default function Home() {
  const transcriber = useTranscriber();
  return (
    <div className="w-full h-screen center">
      <div className="w-full lg:w-[50vw] vstack justify-center text-zinc-700">
        <AudioManager transcriber={transcriber} />
        <Transcript transcribedData={transcriber.output} />
      </div>
      <div className="absolute bottom-5 z-50">
        <div className="hstack justify-center">
          <p className="text-sm ">Developed by </p>
          <Link
            href="https://sabber.dev"
            className="ml-1 font-semibold text-orange-500 underline"
          >
            Sabber Soltani
          </Link>
        </div>
      </div>
    </div>
  );
}
