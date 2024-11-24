import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import "./FloatingButtons.css";

const FloatingWhatsapp = () => {
  return (
    <Box
      position="fixed"
      bottom="20px"
      right="20px"
      zIndex="1000"
      bg="green.500"
      borderRadius="50%"
      w="60px"
      h="60px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      animation="bounce 2s infinite"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
      transition="transform 0.2s ease-in-out"
      _hover={{ transform: "scale(1.1)" }}
      onClick={() => window.open("https://wa.me/5493816532221", "_blank")}
    >
      <Icon as={FaWhatsapp} color="white" w={8} h={8} />
    </Box>
  );
};

export default FloatingWhatsapp;
