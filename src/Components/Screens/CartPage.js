import React from "react";
import { Box, Button, Text, Heading, Image, Stack } from "@chakra-ui/react";
import { useCart } from "../../CartContext";
const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  return (
    <Box maxW="1200px" mx="auto" p={6} py={"12dvh"} minH={"100dvh"}>
      <Heading
        as="h1"
        size="2xl"
        mb={6}
        textAlign="center"
        color="#aa8c76"
        fontFamily={'"Cormorant Garamond", serif'}
        textTransform={"uppercase"}
      >
        Carrito de compras
      </Heading>
      {cart.length === 0 ? (
        <Text maxW="1200px" mx="auto">
          No hay productos en el carrito.
        </Text>
      ) : (
        cart.map((item) => (
          <Box
            key={item.id}
            display="flex"
            alignItems="center"
            borderWidth="1px"
            borderRadius="md"
            p={4}
            mb={4}
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              boxSize="100px"
              objectFit="cover"
            />
            <Stack ml={4} flex="1">
              <Text fontSize="lg" fontWeight="bold">
                {item.name}
              </Text>
              <Text>{item.description}</Text>
              <Text fontWeight="bold">${item.price.toFixed(2)}</Text>
            </Stack>
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                onClick={() => updateQuantity(item.id, -1)}
                colorScheme="red"
                size="sm"
              >
                -
              </Button>
              <Text>{item.quantity}</Text>
              <Button
                onClick={() => updateQuantity(item.id, 1)}
                colorScheme="teal"
                size="sm"
              >
                +
              </Button>
              <Button
                onClick={() => removeFromCart(item.id)}
                colorScheme="gray"
                size="sm"
              >
                Eliminar
              </Button>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default CartPage;
