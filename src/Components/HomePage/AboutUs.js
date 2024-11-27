import React, { useState } from "react";
import { Box, Flex, Text, Heading, Stack, Button } from "@chakra-ui/react";
import Carousel from "./Carrousel/Carousel";

const AboutUs = () => {
  const images = [require("./Carrousel/1.png"), require("./Carrousel/2.png")];
  const [showMore, setShowMore] = useState(false);

  return (
    <Box bg="gray.50" pb={10}>
      <Flex
        direction={{ base: "column", xl: "row" }}
        alignItems="center"
        justifyContent="space-between"
        mx="auto"
        gap={8}
      >
        {/* Carrusel */}
        <Box
          flex="1"
          maxW={{ base: "90dvw", xl: "50dvw" }}
          order={{ base: 1, md: 0 }}
        >
          <Carousel fotos={images} order={{ base: 0, md: 1 }} />
        </Box>

        {/* Texto */}
        <Stack
          pr={"25px"}
          flex="1"
          spacing={4}
          maxW={{ base: "90dvw", md: "45dvw" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Heading
            as="h1"
            size="3xl"
            textAlign="center"
            textTransform={"uppercase"}
            mb={"15px"}
            color="#aa8c76"
            fontFamily={'"Cormorant Garamond", serif'}
          >
            About Us
          </Heading>
          {/* Primer párrafo: siempre visible */}
          <Text
            fontFamily={'"Cormorant Garamond", serif'}
            fontSize={{ base: "2xl", md: "4xl" }}
            color="gray.700"
          >
            Mi nombre es María Sofía Issa, una apasionada de los accesorios y
            del arte de crearlos. Desde pequeña, junto a mis hermanas, solíamos
            pasar horas diseñando y fabricando pulseras y aros, convirtiendo
            esos momentos en pequeños emprendimientos que nos llenaban de
            alegría y satisfacción al compartir nuestras creaciones con otros.
          </Text>

          {/* Segundo párrafo: parcialmente visible */}
          <Text
            fontFamily={'"Cormorant Garamond", serif'}
            fontSize={{ base: "2xl", md: "4xl" }}
            color="gray.700"
          >
            {!showMore ? (
              <>
                Con el tiempo, mi amor por este mundo creció y me llevó a
                dedicarme plenamente a lo que muchas de ustedes conocieron como
                “La Rose”.{" "}
                <Button
                  onClick={() => setShowMore(true)}
                  variant="link"
                  color="#aa8c76"
                  fontSize="3xl"
                  ml={2}
                >
                  Leer más
                </Button>
              </>
            ) : (
              <>
                Con el tiempo, mi amor por este mundo creció y me llevó a
                dedicarme plenamente a lo que muchas de ustedes conocieron como
                “La Rose”. Sin embargo, los años han pasado, y con ellos, mis
                sueños y metas han evolucionado. Hoy, con más experiencia y
                entusiasmo, nace MS Accesorios, un espacio renovado que refleja
                mi dedicación, creatividad y pasión por cada detalle. Este nuevo
                capítulo es mucho más que un cambio de imagen; es una invitación
                a seguir compartiendo juntas un estilo único y auténtico.
                <Button
                  onClick={() => setShowMore(false)}
                  variant="link"
                  color="#aa8c76"
                  fontSize="3xl"
                  ml={2}
                >
                  Leer menos
                </Button>
              </>
            )}
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export default AboutUs;
