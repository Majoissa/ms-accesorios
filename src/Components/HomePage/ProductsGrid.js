import React from "react";
import { Box, Image, Grid, Text, Link, Heading, Stack } from "@chakra-ui/react";

const ProductGrid = () => {
  const products = [
    {
      name: "Gemas",
      image: require("./Carrousel/gema.jpg"),
      link: "/gemas",
    },
    {
      name: "Fiesta",
      image: require("./Carrousel/fiest.jpg"),
      link: "/fiesta",
    },
    {
      name: "Acero Quirúrgico",
      image: require("./Carrousel/acero.jpg"),
      link: "/acero-quirurgico",
    },
    {
      name: "Brazaletes",
      image: require("./Carrousel/brazaletes.jpg"),
      link: "/brazaletes",
    },
  ];

  return (
    <Stack>
      <Heading
        as="h1"
        size="3xl"
        textAlign="center"
        textTransform={"uppercase"}
        mb={"15px"}
        color="#aa8c76"
        mt={{ base: "0px" }}
        fontFamily={'"Cormorant Garamond", serif'}
      >
        Nuestros Accesorios
      </Heading>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={2}
        maxW={{ base: "90dvw", md: "50dvw" }}
        mx="auto"
      >
        {products.map((product, index) => (
          <Box
            key={index}
            position="relative"
            overflow="hidden"
            borderRadius="md"
            cursor="pointer"
            role="group"
            aspectRatio={1}
          >
            <Image
              src={product.image}
              alt={product.name}
              objectFit="cover"
              w="100%"
              h="100%"
              transition="transform 0.3s ease"
              _groupHover={{ transform: "scale(1.1)" }}
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              bg="rgba(0, 0, 0, 0.6)"
              opacity="0"
              transition="opacity 0.3s ease"
              _groupHover={{ opacity: 1 }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="xl" fontWeight="bold" color="white">
                {product.name}
              </Text>
            </Box>
            <Link
              href={product.link}
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
            ></Link>
          </Box>
        ))}
      </Grid>
    </Stack>
  );
};

export default ProductGrid;
