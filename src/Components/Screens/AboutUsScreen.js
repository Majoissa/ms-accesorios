import AboutUs from "../HomePage/AboutUs";
import WhyChooseUs from "../HomePage/WhyChooseUs";
import React from "react";
import { Box, Stack } from "@chakra-ui/react";

const AboutUsScreen = () => {
  const logo = require("../Nav/logo.png");
  return (
    <Box>
      <Stack
        bg={"white"}
        width={"100%"}
        minHeight={"100vh"}
        my="100px"
        direction="column"
        spacing={8}
        align={"center"}
        justify={"center"}
      >
        <AboutUs />
        <WhyChooseUs />
      </Stack>
    </Box>
  );
};

export default AboutUsScreen;
