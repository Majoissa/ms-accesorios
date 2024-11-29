import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Heading,
  VStack,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useCart } from "../../CartContext";

const handleCopyToClipboard = (text, toast) => {
  navigator.clipboard.writeText(text).then(() => {
    toast({
      title: "Copiado al portapapeles.",
      description:
        "Los datos de la cuenta bancaria se han copiado correctamente.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  });
};

const PaymentStep = ({ orderNumber, onBack, total }) => {
  const { clearCart } = useCart();
  const toast = useToast();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const bankDetails = `Banco: Mercado Pago\nCBU: 0000003100011256327711\nAlias: M.Sofia.IC.mp`;

  const handleCompletePurchase = () => {
    const whatsappLink = `https://wa.me/5493816532221?text=Hola,%20mi%20número%20de%20pedido%20es%20${orderNumber}%20y%20he%20realizado%20el%20pago.`;
    window.open(whatsappLink, "_blank");

    clearCart();
    setShowConfirmation(true);
    toast({
      title: "Compra finalizada",
      description:
        "Tu carrito se ha vaciado. Se mostrará la confirmación del pedido.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={6} maxW="800px" mx="auto" p={6} py={"12dvh"}>
      {showConfirmation ? (
        <Box textAlign="center">
          <Heading
            size="lg"
            textAlign="center"
            color="#aa8c76"
            fontFamily={'"Cormorant Garamond", serif'}
          >
            ¡Gracias por tu compra!
          </Heading>
          <Divider my={4} />
          <Text fontSize="lg" color="#31302c">
            Tu número de pedido es:
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="#aa8c76" mt={2} mb={4}>
            {orderNumber}
          </Text>
          <Text color="#31302c">
            Por favor, conserva este número y envía el comprobante de pago a
            través de WhatsApp para concretar la venta.
          </Text>
          <Text mt={4} fontSize="sm" color="gray.500">
            Una vez que el vendedor confirme el pago, se finalizará el proceso
            de venta.
          </Text>
          <Button
            mt={6}
            color="white"
            bg="#aa8c76"
            _hover={{ bg: "#895e4e" }}
            size="md"
            onClick={() => (window.location.href = "/")}
          >
            Volver al inicio
          </Button>
        </Box>
      ) : (
        <>
          <Heading
            size="xl"
            textAlign="center"
            color="#aa8c76"
            fontFamily={'"Cormorant Garamond", serif'}
          >
            Información del Pago
          </Heading>
          <Heading
            size="lg"
            textAlign="center"
            color="#aa8c76"
            fontFamily={'"Cormorant Garamond", serif'}
          >
            Precio final: ${total.toFixed(2)}
          </Heading>
          <Text color="#31302c">
            Realiza una transferencia bancaria con los siguientes datos:
          </Text>
          <Box borderWidth="1px" p={4} borderRadius="md" bg="gray.100" w="100%">
            <Text fontWeight="bold" color="#31302c">
              Banco: Mercado Pago
            </Text>
            <Text color="#31302c">CBU: 0000003100011256327711</Text>
            <Text color="#31302c">Alias: M.Sofia.IC.mp</Text>
            <Divider my={2} />
            <Text fontWeight="bold" color="#aa8c76">
              Número de Pedido: {orderNumber}
            </Text>
          </Box>
          <Button
            colorScheme="teal"
            bg="#aa8c76"
            color="white"
            _hover={{ bg: "#895e4e" }}
            onClick={() => handleCopyToClipboard(bankDetails, toast)}
          >
            Copiar datos de pago
          </Button>
          <Button
            colorScheme="teal"
            bg="#aa8c76"
            color="white"
            _hover={{ bg: "#895e4e" }}
            onClick={handleCompletePurchase}
          >
            Enviar comprobante por WhatsApp
          </Button>
          <Button
            variant="outline"
            borderColor="#aa8c76"
            color="#aa8c76"
            _hover={{ bg: "#f7f7f7" }}
            onClick={onBack}
          >
            Volver al carrito
          </Button>
        </>
      )}
    </VStack>
  );
};

export default PaymentStep;
