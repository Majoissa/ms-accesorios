import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "wouter";
import "./FloatingButtons.css";

const FloatingCart = () => {
  return (
    <Box
      position="fixed"
      bottom="20px"
      right="90px"
      zIndex="1000"
      bg="#8e705e"
      borderRadius="50%"
      w="60px"
      h="60px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      animation="shake 1.5s infinite"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
      transition="transform 0.2s ease-in-out"
      _hover={{ transform: "scale(1.1)" }}
    >
      <Link href="/carrito">
        <Icon as={FaShoppingCart} color="white" w={8} h={8} />
      </Link>
    </Box>
  );
};

export default FloatingCart;
