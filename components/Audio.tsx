import React, { useState } from "react";
import { Text, VStack, Icon, Input, Button, Center } from "@chakra-ui/react";
import Link from "next/link";
import useToken from "@/store/useToken";
import { Toaster, toast } from "react-hot-toast";
import { FaTwitterSquare } from "react-icons/fa";
import { FcDeleteDatabase } from "react-icons/fc";

const Audio = () => {
  const [loading, setLoading] = useState(false);
  const [generatedTranslation, setGeneratedTranslation] = useState<any>("");
  const [direction, setDirection] = useState<"rtl" | "ltr">("ltr");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const { token, removeToken } = useToken();

  const url = "https://api.openai.com/v1/audio/transcriptions";

  const transcribe = async () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    formData.append("model", "whisper-1");
    formData.append("response_format", "json");
    formData.append("promt", "seprate each line when you want to translate");

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    return fetch(url, {
      method: "POST",
      body: formData,
      headers: headers,
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  };

  const translateAudio = async () => {
    setGeneratedTranslation("");
    setLoading(true);

    const transcribed = await transcribe();
    console.log(transcribed);
    setGeneratedTranslation(
      transcribed.text ? transcribed.text : "لطفا توکن را بررسی کنید"
    );
    setLoading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <>
      <Button
        onClick={removeToken}
        pos="fixed"
        top="5"
        variant={"link"}
        right="5"
      >
        <Icon as={FcDeleteDatabase} w={8} h={8} />
      </Button>
      <Toaster />
      <VStack justify="center" minH="100vh">
        <Text fontWeight="bold" fontSize={["xl", "3xl"]}>
          Video/Audio Transcription
        </Text>

        <Link href="https://twitter.com/sabber_dev">
          <Icon as={FaTwitterSquare} w={8} h={8} color="twitter.500" />
        </Link>

        <Center display="flex" w={["80", "50vw"]} flexDir="column" p="2">
          {generatedTranslation === "" && (
            <>
              <Text
                style={{
                  direction: "rtl",
                }}
                fontWeight="bold"
                fontSize={["sm", "lg"]}
              >
                فرمت های قابل قبول:{" "}
              </Text>
              <Text fontWeight="semibold" fontSize={["sm", "md"]}>
                m4a, mp3, webm, mp4, mpga, wav, mpeg
              </Text>

              <Input
                width={["64"]}
                pt="3px"
                pl="2"
                type="file"
                border="2px"
                mt="5"
                borderColor="gray.600"
                accept="audio/*,video/*"
                onChange={handleFileChange}
              />

              {!loading && (
                <Button
                  w="32"
                  h="10"
                  colorScheme="twitter"
                  mt="5"
                  onClick={translateAudio}
                >
                  Transcript &rarr;
                </Button>
              )}
              {loading && (
                <Button w="32" h="10" colorScheme="twitter" mt="5" disabled>
                  Loading...
                </Button>
              )}
            </>
          )}

          {generatedTranslation && (
            <VStack
              style={{
                direction: "ltr",
              }}
            >
              <Button
                onClick={() =>
                  setDirection(direction === "rtl" ? "ltr" : "rtl")
                }
                w="14"
                h="8"
                fontSize="sm"
                colorScheme="twitter"
              >
                rtl/ltr
              </Button>

              <Text
                w="full"
                mt="5"
                fontSize={["sm", "lg"]}
                whiteSpace="pre-line"
                style={{
                  direction: direction,
                }}
              >
                {generatedTranslation}
              </Text>

              <Button
                w="28"
                colorScheme="twitter"
                onClick={() => {
                  navigator.clipboard.writeText(generatedTranslation);
                  toast("متن کپی شد", {
                    icon: "📁",
                  });
                }}
              >
                کپی متن
              </Button>
              <div className="mb-[-80px]" />
            </VStack>
          )}
        </Center>
      </VStack>
    </>
  );
};

export default Audio;
