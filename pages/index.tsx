import { AudioManager } from "@/components/AudioManager";
import Transcript from "@/components/Transcript";
import { useTranscriber } from "@/hooks/useTranscriber";

export default function Home() {
  const transcriber = useTranscriber();
  return (
    <div className="w-full h-screen center">
      <div className="w-full lg:w-[50vw] vstack justify-center text-zinc-700">
        <AudioManager transcriber={transcriber} />
        <Transcript transcribedData={transcriber.output} />
      </div>
    </div>
  );
}
