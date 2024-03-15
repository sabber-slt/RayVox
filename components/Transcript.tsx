import { useRef, useEffect } from "react";

// Assuming TranscriberData and formatAudioTimestamp are defined elsewhere
import { TranscriberData } from "../hooks/useTranscriber";
import { formatAudioTimestamp } from "../utils/AudioUtils";

interface Props {
  transcribedData: TranscriberData | undefined;
}

export default function Transcript({ transcribedData }: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  const saveBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportSRT = () => {
    let chunks = transcribedData?.chunks ?? [];
    let srtContent = chunks
      .map((chunk, index) => {
        const startTime =
          chunk.timestamp[0] !== null
            ? formatAudioTimestamp(chunk.timestamp[0])
            : "00:00:00";
        const endTime =
          chunk.timestamp[1] !== null
            ? formatAudioTimestamp(chunk.timestamp[1])
            : "00:00:00";
        return `${index + 1}\n${startTime} --> ${endTime}\n${chunk.text}\n`;
      })
      .join("\n");

    const blob = new Blob([srtContent], { type: "text/plain" });
    saveBlob(blob, "transcript.srt");
  };

  useEffect(() => {
    if (divRef.current) {
      const diff = Math.abs(
        divRef.current.offsetHeight +
          divRef.current.scrollTop -
          divRef.current.scrollHeight
      );

      if (diff <= 64) {
        divRef.current.scrollTop = divRef.current.scrollHeight;
      }
    }
  });

  return (
    <>
      {transcribedData && !transcribedData.isBusy && (
        <div className="w-full text-center mt-5">
          <button
            onClick={exportSRT}
            className="text-white w-44 h-12 center bg-orange-500 hover:bg-orange-600 font-medium rounded-lg text-sm text-center inline-flex items-center"
          >
            Download SRT
          </button>
        </div>
      )}
      <div
        ref={divRef}
        className="w-full flex flex-col my-2 p-4 max-h-[20rem] overflow-y-auto"
      >
        {transcribedData?.chunks &&
          transcribedData.chunks.map((chunk, i) => (
            <div
              key={`${i}-${chunk.text}`}
              className="w-full flex flex-row mb-2 bg-white rounded-lg p-4 shadow-xl shadow-black/5 ring-1 ring-slate-700/10"
            >
              <div className="mr-5">
                {formatAudioTimestamp(chunk.timestamp[0])}
              </div>
              {chunk.text}
            </div>
          ))}
      </div>
    </>
  );
}
