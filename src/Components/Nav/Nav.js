import React, { useState } from "react";
import {
  Box,
  Stack,
  Text,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { Link } from "wouter";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const categories = [
    { name: "Todos los productos", path: "/productos" },
    { name: "Acero", path: "/acero" },
    { name: "Brazaletes", path: "/brazaletes" },
    { name: "Fiesta", path: "/fiesta" },
    { name: "Gemas", path: "/gemas" },
  ];

  return (
    <>
      {/* Navbar */}
      <Box
        as="nav"
        className="navBar"
        bg="#31302c"
        position={"fixed"}
        width={"100%"}
        height={"70px"}
        top={0}
        zIndex={11}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={4}
      >
        {/* Logo */}
        <Link to="/">
          <Stack direction={"row"} alignItems={"center"} spacing={0}>
            <Text
              color={"white"}
              fontFamily={'"Cormorant Garamond", serif'}
              fontSize={"50px"}
            >
              MS
            </Text>
            <Text
              color={"white"}
              fontFamily={'"Cormorant Garamond", serif'}
              fontSize={"20px"}
              mt={"15px"}
            >
              ACCESORIOS
            </Text>
          </Stack>
        </Link>

        {/* Enlaces para pantallas grandes */}
        <HStack
          spacing={8}
          display={{ base: "none", md: "flex" }} // Visible solo en pantallas medianas y grandes
        >
          <Link to="/">
            <Text textTransform={"uppercase"} color={"white"}>
              Inicio
            </Text>
          </Link>
          {/* Dropdown de Productos */}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="ghost"
              color="white"
              textTransform="uppercase"
              px={0}
            >
              Productos
            </MenuButton>
            <MenuList>
              {categories.map((category) => (
                <Link to={category.path} key={category.name}>
                  <MenuItem>{category.name}</MenuItem>
                </Link>
              ))}
            </MenuList>
          </Menu>
          <Link to="/contacto">
            <Text textTransform={"uppercase"} color={"white"}>
              Contacto
            </Text>
          </Link>
          <Link to="/nosotros">
            <Text textTransform={"uppercase"} color={"white"}>
              Nosotros
            </Text>
          </Link>
        </HStack>

        {/* Menú Hamburguesa para pantallas pequeñas */}
        <IconButton
          aria-label="Abrir menú"
          icon={<HamburgerIcon />}
          variant="ghost"
          color={"white"}
          fontSize="30px"
          display={{ base: "block", md: "none" }} // Solo visible en pantallas pequeñas
          onClick={toggleDrawer}
        />
      </Box>

      {/* Drawer (Menú deslizable desde la derecha) */}
      <Drawer isOpen={isOpen} placement="right" onClose={toggleDrawer}>
        <DrawerOverlay bg="rgba(0, 0, 0, 0.6)" /> {/* Capa transparente */}
        <DrawerContent bg="#31302c" width={"70vw"}>
          <DrawerCloseButton color={"white"} />
          <DrawerHeader>
            <Text textTransform={"uppercase"} color={"white"}>
              Menú
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <VStack align={"start"} spacing={4}>
              <Link to="/" onClick={toggleDrawer}>
                <Text textTransform={"uppercase"} color={"white"}>
                  Inicio
                </Text>
              </Link>
              {/* Dropdown de Productos para móvil */}
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant="ghost"
                  color="white"
                  textTransform="uppercase"
                  pl={0}
                >
                  Productos
                </MenuButton>
                <MenuList>
                  {categories.map((category) => (
                    <Link to={category.path} key={category.name}>
                      <MenuItem>{category.name}</MenuItem>
                    </Link>
                  ))}
                </MenuList>
              </Menu>
              <Link to="/contacto" onClick={toggleDrawer}>
                <Text textTransform={"uppercase"} color={"white"}>
                  Contacto
                </Text>
              </Link>
              <Link to="/nosotros" onClick={toggleDrawer}>
                <Text textTransform={"uppercase"} color={"white"}>
                  Nosotros
                </Text>
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Nav;
