import React from "react";
import { Box, Flex, Link, Text, Image, Icon } from "@chakra-ui/react";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <Box bg="#31302c" color="white" py={6}>
      <Flex direction="row" align="center" justify="center" maxW="100%">
        {/* Redes Sociales y Contacto */}
        <Flex align="center" mt={{ base: 4, md: 0 }}>
          {/* Email */}
          <Link
            href="mailto:ms.accesorios97@gmail.com"
            isExternal
            display="flex"
            alignItems="center"
            mr={4}
          >
            <Icon as={FaEnvelope} w={6} h={6} mr={2} />
            Email
          </Link>

          {/* Instagram */}
          <Link
            href="https://www.instagram.com/accesorios.ms_"
            isExternal
            display="flex"
            alignItems="center"
            mr={4}
          >
            <Icon as={FaInstagram} w={6} h={6} mr={2} />
            Instagram
          </Link>

          {/* WhatsApp */}
          <Link
            href="https://wa.me/5493816532221"
            isExternal
            display="flex"
            alignItems="center"
          >
            <Icon as={FaWhatsapp} w={6} h={6} mr={2} />
            WhatsApp
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
