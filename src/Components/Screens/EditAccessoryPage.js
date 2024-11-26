import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Switch,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons"; // Icono para el botón de agregar
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; // Funciones de Firestore
import { app } from "../../firebaseConfig"; // Configuración de Firebase
import { useRoute } from "wouter";
import Carousel from "../HomePage/Carrousel/Carousel";

const db = getFirestore(app);

const EditAccessoryForm = () => {
  const [match, params] = useRoute("/editar-producto/:category/:id");
  const { category, id } = params;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrls, setImageUrls] = useState([""]);
  const [stock, setStock] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, `accesorios/${category}/items`, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setDescription(data.description || "");
          setPrice(data.price || "");
          setImageUrls(data.imageUrls || [""]);
          setStock(data.stock || false);
        } else {
          alert("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error al cargar el producto: ", error);
      }
    };

    fetchProduct();
  }, [category, id]);

  const handleAddImageUrl = () => {
    setImageUrls([...imageUrls, ""]); // Agrega un nuevo input vacío al array
  };

  const handleImageUrlChange = (index, value) => {
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = value; // Actualiza la URL correspondiente
    setImageUrls(updatedUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const docRef = doc(db, `accesorios/${category}/items`, id);
      await updateDoc(docRef, {
        name,
        description,
        price: parseFloat(price),
        imageUrls,
        stock,
      });
      alert("Producto actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el producto: ", error);
      alert("Hubo un error al actualizar el producto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      maxW="1200px"
      mx="auto"
      p={6}
      my={"12dvh"}
      bg="gray.100"
      borderRadius="md"
      minH={"100dvh"}
    >
      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={8}
        alignItems="flex-start"
      >
        {/* Formulario */}
        <Box flex="1">
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nombre del Accesorio</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  bg={"white"}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  bg={"white"}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Precio</FormLabel>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  bg={"white"}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>URLs de Imágenes</FormLabel>
                {imageUrls.map((url, index) => (
                  <Stack direction="row" align="center" key={index} spacing={2}>
                    <Input
                      type="url"
                      placeholder={`URL de la imagen ${index + 1}`}
                      value={url}
                      onChange={(e) =>
                        handleImageUrlChange(index, e.target.value)
                      }
                      bg={"white"}
                    />
                    {index === imageUrls.length - 1 && (
                      <IconButton
                        icon={<AddIcon />}
                        onClick={handleAddImageUrl}
                        colorScheme="teal"
                        aria-label="Agregar URL"
                      />
                    )}
                  </Stack>
                ))}
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel>¿En Stock?</FormLabel>
                <Switch
                  isChecked={stock}
                  onChange={(e) => setStock(e.target.checked)}
                  colorScheme="teal"
                />
              </FormControl>

              <Button type="submit" colorScheme="teal" isLoading={isLoading}>
                Guardar Cambios
              </Button>
            </Stack>
          </form>
        </Box>

        {/* Carousel */}
        <Box flex="1" maxW="600px">
          {imageUrls.length > 0 ? (
            <Carousel fotos={imageUrls} /> // Pasar el array de imágenes al carousel
          ) : (
            <Box
              bg="gray.300"
              h="200px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="md"
            >
              <p>No hay imágenes disponibles</p>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default EditAccessoryForm;
