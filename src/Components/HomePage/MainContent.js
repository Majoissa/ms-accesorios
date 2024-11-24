import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import Carousel from "./Carrousel/Carousel";
import ProductGrid from "./ProductsGrid";

const MainContent = () => {
  const images = [
    require("./Carrousel/4.png"),
    require("./Carrousel/5.png"),
    require("./Carrousel/6.png"),
    require("./Carrousel/7.png"),
    require("./Carrousel/9.png"),
    require("./Carrousel/10.png"),
    require("./Carrousel/17.png"),
  ];

  const logo = require("../Nav/logo.png");
  return (
    <Box>
      <Stack
        bg={"white"}
        width={"100%"}
        minHeight={"100vh"}
        mt={{ base: "0px", md: "80px" }}
        direction={{ base: "column", lg: "row" }}
        spacing={8}
        align={"center"}
        justify={"center"}
      >
        <Carousel fotos={images} />
        <ProductGrid />
      </Stack>
    </Box>
  );
};

export default MainContent;
