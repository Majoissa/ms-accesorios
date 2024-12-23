import React from "react";
import { Box, Icon, Text, Badge } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "wouter";
import { useCart } from "../../CartContext";
import "./FloatingButtons.css";

const FloatingCart = () => {
  const { cart } = useCart();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

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
        <Box position="relative" display="flex" alignItems="center">
          <Icon as={FaShoppingCart} color="white" w={8} h={8} />
          {totalQuantity > 0 && (
            <Badge
              position="absolute"
              top="-5px"
              right="-5px"
              bg="red.500"
              color="white"
              borderRadius="full"
              w="20px"
              h="20px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="sm"
              boxShadow="0 0 8px rgba(0, 0, 0, 0.2)"
            >
              {totalQuantity}
            </Badge>
          )}
        </Box>
      </Link>
    </Box>
  );
};

export default FloatingCart;
