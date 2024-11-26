import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Stack,
  Button,
} from "@chakra-ui/react";

const WhyChooseUs = () => {
  const [showMore, setShowMore] = useState(false);
  const image = require("./Carrousel/IG posts.png");

  return (
    <Box bg="gray.50" maxW={"100%"} margin={"auto"}>
      <Flex
        direction={{ base: "column", xl: "row" }}
        alignItems="center"
        justifyContent="space-between"
        mx="auto"
        gap={8}
      >
        {/* Texto */}
        <Stack
          pl={"25px"}
          flex="1"
          spacing={4}
          maxW={{ base: "90dvw", md: "50dvw" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Heading
            as="h1"
            size="3xl"
            textAlign="center"
            textTransform={"uppercase"}
            mb={"15px"}
            color="#aa8c76"
            mt={{ base: "0px", md: "80px" }}
            fontFamily={'"Cormorant Garamond", serif'}
          >
            Why US?
          </Heading>
          <Text
            fontFamily={'"Cormorant Garamond", serif'}
            fontSize={"4xl"}
            color="gray.700"
          >
            En MS Accesorios, combinamos <strong>precios accesibles</strong>, la
            mejor <strong>calidad</strong> y nuestra <strong>pasión</strong> por
            los accesorios para ofrecerte productos únicos y estilos que
            reflejan tu personalidad.
          </Text>
          <Text
            fontFamily={'"Cormorant Garamond", serif'}
            fontSize={"4xl"}
            color="gray.700"
          >
            {showMore && (
              <span>
                {" "}
                Creemos que cada detalle cuenta, y es por eso que trabajamos con
                dedicación para crear piezas que se ajusten a tus gustos y te
                hagan destacar en cualquier ocasión. Con años de experiencia en
                el mercado, nuestro compromiso es brindarte los mejores
                accesorios para cada momento especial.
              </span>
            )}
            <Button
              onClick={() => setShowMore(!showMore)}
              variant="link"
              color="#aa8c76"
              fontSize="3xl"
              ml={2}
            >
              {showMore ? "Leer menos" : "Leer más"}
            </Button>
          </Text>
        </Stack>

        {/* Imagen */}
        <Box flex="1">
          <Image
            src={image}
            alt="Elegir MS Accesorios"
            maxW={{ base: "90dvw", md: "50dvw" }}
            borderRadius="md"
            objectFit="cover"
            width="100%"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default WhyChooseUs;
