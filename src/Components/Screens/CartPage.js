import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Heading,
  Image,
  Stack,
  Divider,
  IconButton,
  VStack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useCart } from "../../CartContext";
import PaymentStep from "./PaymentStep";
import { v4 as uuidv4 } from "uuid";
import { Link } from "wouter";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [orderNumber, setOrderNumber] = useState(uuidv4());
  const [deliveryOption, setDeliveryOption] = useState("");
  const [deliveryCost, setDeliveryCost] = useState(0);

  const total =
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0) +
    deliveryCost;

  const handleDeliveryChange = (value) => {
    setDeliveryOption(value);
    setDeliveryCost(value === "envio" ? 2000 : 0);
  };

  const handleBackToCart = () => setStep(1);

  const handleCompletePurchase = () => {
    clearCart();
    setOrderNumber(uuidv4());
    setStep(1);
  };

  return (
    <Box maxW="1200px" mx="auto" p={6} py={"12dvh"} minH={"100dvh"}>
      {step === 1 && (
        <>
          <Box
            display="flex"
            alignItems="center"
            mb={6}
            justifyContent={"center"}
          >
            <IconButton
              icon={<ArrowBackIcon />}
              aria-label="Volver"
              variant="ghost"
              color="#aa8c76"
              fontSize="20px"
              onClick={() => window.history.back()}
              _hover={{ bg: "transparent", color: "#895e4e" }}
            />
            <Heading
              as="h1"
              size="2xl"
              color="#aa8c76"
              fontFamily={'"Cormorant Garamond", serif'}
              textTransform={"uppercase"}
            >
              Carrito de compras
            </Heading>
          </Box>

          {cart.length === 0 ? (
            <Box textAlign="center">
              <Text>No hay productos en el carrito.</Text>
              <Button
                mt={4}
                color="white"
                bg="#aa8c76"
                _hover={{ bg: "#895e4e" }}
                size="md"
                as={Link}
                href="/productos"
              >
                Agregar productos
              </Button>
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

              {/* Opciones de entrega */}
              <Box
                mt={8}
                borderWidth="1px"
                borderRadius="md"
                p={6}
                bg="gray.50"
              >
                <Heading as="h2" size="md" mb={4} color="#31302c">
                  Forma de entrega
                </Heading>
                <RadioGroup
                  onChange={handleDeliveryChange}
                  value={deliveryOption}
                >
                  <VStack align="start" spacing={4}>
                    <Radio value="envio" colorScheme="teal">
                      Envío a domicilio (Costo adicional: $2000)
                    </Radio>
                    <Radio value="buscar" colorScheme="teal">
                      Retirar en tienda (Dirección a coordinar con el vendedor)
                    </Radio>
                  </VStack>
                </RadioGroup>
              </Box>

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
                {cart.map((item) => (
                  <Text key={item.id} color="#31302c" mb={2}>
                    {item.name} x {item.quantity} = ${" "}
                    {(item.price * item.quantity).toFixed(2)}
                  </Text>
                ))}
                {deliveryOption === "envio" && (
                  <Text color="#31302c" mb={2}>
                    Envío: $2000
                  </Text>
                )}
                <Divider my={4} />
                <Text fontSize="lg" fontWeight="bold" color="#31302c">
                  Total: ${total.toFixed(2)}
                </Text>
                <Button
                  mt={4}
                  color="white"
                  bg="#aa8c76"
                  _hover={{ bg: "#895e4e" }}
                  size="md"
                  onClick={() => setStep(2)}
                >
                  Finalizar compra
                </Button>
              </Box>
            </>
          )}
        </>
      )}

      {step === 2 && (
        <PaymentStep
          orderNumber={orderNumber}
          onBack={handleBackToCart}
          onComplete={handleCompletePurchase}
          total={total}
        />
      )}
    </Box>
  );
};

export default CartPage;
