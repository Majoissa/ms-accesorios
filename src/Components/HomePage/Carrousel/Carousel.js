import React, { useState, useEffect, useRef } from "react";
import { Box, Image, Flex, Circle } from "@chakra-ui/react";

const Carousel = ({ fotos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === fotos.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [fotos.length]);

  // Funciones para manejar gestos táctiles
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current && touchEndX.current) {
      const difference = touchStartX.current - touchEndX.current;
      if (difference > 50) {
        // Deslizar hacia la izquierda
        setCurrentIndex((prevIndex) =>
          prevIndex === fotos.length - 1 ? 0 : prevIndex + 1
        );
      } else if (difference < -50) {
        // Deslizar hacia la derecha
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? fotos.length - 1 : prevIndex - 1
        );
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <Box
      maxW={{ base: "90dvw", md: "50dvw" }}
      ml="0"
      position="relative"
      pt={{ base: "80px", md: "0px" }}
    >
      {/* Contenedor de la imagen */}
      <Box
        position="relative"
        borderRadius="md"
        overflow="hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={fotos[currentIndex]}
          alt={`Producto ${currentIndex + 1}`}
          w="100%"
          h="auto"
          objectFit="cover"
        />
        <Flex
          position="absolute"
          bottom="10px"
          left="50%"
          transform="translateX(-50%)"
          gap={2}
          justify="center"
        >
          {fotos.map((_, index) => (
            <Circle
              key={index}
              size="10px"
              bg={index === currentIndex ? "white" : "gray.400"}
              border={index === currentIndex ? "2px solid teal" : "none"}
              cursor="pointer"
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Carousel;
