import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Heading,
  VStack,
  Divider,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useCart } from "../../CartContext";
import emailjs from "emailjs-com";

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
  const { cart, clearCart } = useCart();
  const toast = useToast();
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Estados para el formulario
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const bankDetails = `Banco: Mercado Pago\nCBU: 0000003100011256327711\nAlias: M.Sofia.IC.mp`;

  const handleCompletePurchase = () => {
    if (!clientName || !clientEmail || !clientPhone) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, completa todos los campos del formulario.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Enviar correo al vendedor
    const productList = cart
      .map(
        (item) =>
          `- ${item.name} (Cantidad: ${
            item.quantity
          }, Precio: $${item.price.toFixed(2)})`
      )
      .join("\n");

    const emailParams = {
      orderNumber,
      clientName,
      clientEmail,
      clientPhone,
      productList,
      totalPrice: total.toFixed(2),
    };

    emailjs
      .send(
        "service_n1letxt",
        "template_kpv5qcq",
        emailParams,
        "MENCKLPI6UjT9AkBo"
      )
      .then(
        () => {
          toast({
            title: "Pedido enviado",
            description:
              "El pedido y los datos del cliente fueron enviados al vendedor.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          // Limpiar el carrito y mostrar la confirmación
          clearCart();
          setShowConfirmation(true);
        },
        (error) => {
          console.error("Error al enviar el correo:", error);
          toast({
            title: "Error al enviar el pedido",
            description: "Por favor, intenta nuevamente.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      );

    // Redirigir a WhatsApp con el número de pedido
    const whatsappLink = `https://wa.me/5493816532221?text=Hola,%20mi%20número%20de%20pedido%20es%20${orderNumber}%20y%20he%20realizado%20el%20pago.`;
    window.open(whatsappLink, "_blank");
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
          <Box w="100%" mt={6}>
            <FormControl mb={4} isRequired>
              <FormLabel color="#31302c">Nombre completo</FormLabel>
              <Input
                placeholder="Escribe tu nombre"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel color="#31302c">Correo electrónico</FormLabel>
              <Input
                type="email"
                placeholder="Escribe tu correo"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel color="#31302c">Número de contacto</FormLabel>
              <Input
                placeholder="Escribe tu número de contacto"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
              />
            </FormControl>
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
            Enviar comprobante por WhatsApp y finalizar compra
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
