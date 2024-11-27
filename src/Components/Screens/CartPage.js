import React from "react";
import {
  Box,
  Button,
  Text,
  Heading,
  Image,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { Link } from "wouter"; // Usamos Link para navegación
import { useCart } from "../../CartContext";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  // Calcular el total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
        <Box textAlign="center">
          <Text>No hay productos en el carrito.</Text>
          <Link href="/productos">
            <Button
              mt={4}
              color="white"
              bg="#aa8c76"
              _hover={{ bg: "#895e4e" }}
              size="md"
            >
              Agregar productos
            </Button>
          </Link>
        </Box>
      ) : (
        <>
          {cart.map((item) => (
            <Box
              key={item.id}
              display="flex"
              flexDirection={{ base: "column", sm: "row" }}
              alignItems="center"
              borderWidth="1px"
              borderRadius="md"
              p={4}
              mb={4}
            >
              <Image
                src={item.imageUrl}
                alt={item.name}
                boxSize={{ base: "100%", sm: "100px" }}
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
                  disabled={item.quantity === 1}
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
          ))}

          {/* Card de total */}
          <Box
            mt={8}
            borderWidth="1px"
            borderRadius="md"
            p={6}
            bg="gray.50"
            textAlign="center"
          >
            <Heading as="h2" size="lg" mb={4} color="#31302c">
              Resumen del Pedido
            </Heading>
            <Divider mb={4} />
            <Text fontSize="lg" fontWeight="bold" color="#31302c">
              Total: ${total.toFixed(2)}
            </Text>
            <Button
              mt={4}
              color="white"
              bg="#aa8c76"
              _hover={{ bg: "#895e4e" }}
              size="md"
            >
              Finalizar compra
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartPage;
