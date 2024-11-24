import React, { useRef } from "react";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Input,
  Textarea,
  Button,
  Link,
  Icon,
} from "@chakra-ui/react";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import emailjs from "emailjs-com";

const Contact = () => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_n1letxt",
        "template_uteodau",
        form.current,
        "MENCKLPI6UjT9AkBo"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Mensaje enviado correctamente");
        },
        (error) => {
          console.log(error.text);
          alert("Ocurrió un error al enviar el mensaje. Inténtalo de nuevo.");
        }
      );

    e.target.reset();
  };

  return (
    <Box bg="#ede6e2" color="#31302c" py={10} px={6} minH={"100dvh"}>
      <Stack
        spacing={8}
        maxW="800px"
        mx="auto"
        display={"flex"}
        flexDir={"column"}
        pt={"15dvh"}
      >
        {/* Título */}
        <Heading
          as="h1"
          size="3xl"
          textAlign="center"
          textTransform="uppercase"
          mb="15px"
          color="#aa8c76"
          fontFamily={'"Cormorant Garamond", serif'}
        >
          Contact Us
        </Heading>

        {/* Formulario */}
        <form ref={form} onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Input
              name="user_name"
              placeholder="Nombre"
              variant="outline"
              focusBorderColor="#31302c"
              bg="white"
              _placeholder={{ color: "#31302c" }}
              fontSize={"2xl"}
            />
            <Input
              name="user_email"
              placeholder="Correo Electrónico"
              type="email"
              variant="outline"
              focusBorderColor="#31302c"
              bg="white"
              _placeholder={{ color: "#31302c" }}
              isRequired
              fontSize={"2xl"}
            />
            <Textarea
              name="message"
              placeholder="Escribe tu mensaje..."
              variant="outline"
              focusBorderColor="#31302c"
              bg="white"
              _placeholder={{ color: "#31302c" }}
              fontSize={"2xl"}
            />
            <Button
              type="submit"
              bg="#31302c"
              color="white"
              _hover={{ bg: "#4a4a4a" }}
              maxW={"150px"}
              margin={"auto"}
            >
              Enviar
            </Button>
          </Stack>
        </form>

        {/* Botones de Contacto */}
        <Flex justify="center" gap={6} mt={6}>
          {/* Correo */}
          <Link href="mailto:ms.accesorios97@gmail.com" isExternal>
            <Button
              leftIcon={<FaEnvelope />}
              bg="#31302c"
              color="white"
              _hover={{ bg: "#4a4a4a" }}
            >
              Email
            </Button>
          </Link>

          {/* Instagram */}
          <Link href="https://www.instagram.com/accesorios.ms_" isExternal>
            <Button
              leftIcon={<FaInstagram />}
              bg="#31302c"
              color="white"
              _hover={{ bg: "#4a4a4a" }}
            >
              Instagram
            </Button>
          </Link>

          {/* WhatsApp */}
          <Link href="https://wa.me/5493816532221" isExternal>
            <Button
              leftIcon={<FaWhatsapp />}
              bg="#31302c"
              color="white"
              _hover={{ bg: "#4a4a4a" }}
            >
              WhatsApp
            </Button>
          </Link>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Contact;
