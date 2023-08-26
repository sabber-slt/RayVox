import React, { useState } from "react";
import languages from "../languages";
import { Toaster, toast } from "react-hot-toast";
import {
  Text,
  VStack,
  Icon,
  HStack,
  Input,
  Select,
  Button,
  Center,
  Box,
} from "@chakra-ui/react";
import { FaTwitterSquare } from "react-icons/fa";
import Link from "next/link";
import useToken from "@/store/useToken";

const Audio = () => {
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<string>(languages[0].value);
  const [generatedTranslation, setGeneratedTranslation] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const { token } = useToken();

  const url = "https://api.openai.com/v1/audio/transcriptions";

  const transcribe = async () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    formData.append("model", "whisper-1");
    formData.append("response_format", "verbose_json");
    if (language) {
      formData.append("language", language);
    }

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
    console.log(transcribed.text);
    setGeneratedTranslation(transcribed.text);
    setLoading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedLabel = languages.find(
      (language) => language.value === selectedValue
    )?.value;
    if (selectedLabel) {
      setLanguage(selectedLabel);
    }
  };

  //accept audio and video
  const fileUrl = "/audio.*";

  return (
    <>
      <Toaster />
      <VStack justify="center" minH="100vh">
        <Text fontWeight="bold" fontSize={["xl", "2xl"]}>
          پلتفرم تبدیل ویدیو به متن
        </Text>
        <HStack
          px={["2"]}
          py={["1"]}
          borderRadius={["5px"]}
          border="2px"
          borderColor="twitter.500"
        >
          <Icon as={FaTwitterSquare} w={8} h={8} color="twitter.500" />
          <Link href="https://twitter.com/">@sabber_dev</Link>
        </HStack>
        <Center
          display="flex"
          w={["80", "50vw"]}
          flexDir="column"
          p="2"
          py={["5", "10"]}
        >
          <Text
            style={{
              direction: "rtl",
            }}
            fontWeight="bold"
            fontSize={["sm", "2xl"]}
          >
            فرمت های قابل قبول:{" "}
          </Text>
          <Text fontWeight="semibold" fontSize={["sm", "md"]}>
            m4a, mp3, webm, mp4, mpga, wav, mpeg
          </Text>

          <Input
            width={["64"]}
            pt="1.5"
            pl="2"
            type="file"
            border="2px"
            mt="5"
            borderColor="gray.600"
            // add audio and video
            accept="audio/*,video/*"
            onChange={handleFileChange}
          />

          <Select
            width={["64"]}
            mt="5"
            border="2px"
            borderColor="gray.600"
            onChange={handleChange}
            value={language}
          >
            {languages.map((language) => (
              <option key={language.value} value={language.value}>
                {language.label}
              </option>
            ))}
          </Select>

          {!loading && (
            <Button
              w="32"
              h="10"
              colorScheme="twitter"
              mt="5"
              onClick={translateAudio}
            >
              Translate &rarr;
            </Button>
          )}
          {loading && (
            <Button w="32" h="10" colorScheme="twitter" mt="5" disabled>
              Loading...
            </Button>
          )}

          {generatedTranslation && (
            <VStack
              style={{
                direction: "ltr",
              }}
            >
              <Text
                w="full"
                mt="5"
                fontSize={["sm", "lg"]}
                whiteSpace="pre-line"
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
