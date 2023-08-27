import React, { useState } from "react";
import { Popover, Button, Text, Center, VStack, Input } from "@chakra-ui/react";
import useToken from "@/store/useToken";

const Pop = () => {
  const { setToken } = useToken();
  const [tokenValue, setTokenValue] = useState("");

  const submit = () => {
    setToken(tokenValue);
  };

  return (
    <Center w="100vw" h="100vh">
      <Popover>
        <VStack
          w={["80"]}
          py="5"
          bg="gray.200"
          color="gray.700"
          justify="center"
          rounded="lg"
          boxShadow="xl"
        >
          <Text
            style={{
              direction: "rtl",
            }}
          >
            api key دریافتی خود از openai را وارد کنید
          </Text>
          <Input
            w="64"
            bg="white"
            color="gray.700"
            type="text"
            mt="3"
            value={tokenValue}
            onChange={(e) => setTokenValue(e.target.value)}
          />
          <Button onClick={submit} w="28" h="8" colorScheme="twitter" mt="5">
            ثبت
          </Button>
        </VStack>
      </Popover>
    </Center>
  );
};

export default Pop;
