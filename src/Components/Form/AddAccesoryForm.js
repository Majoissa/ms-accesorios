import React, { useState } from "react";
import {
  Box,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Select,
  Stack,
  IconButton,
  Switch,
  Flex,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons"; // Icono para el botón de agregar
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Importa Firestore
import { app } from "../../firebaseConfig"; // Importa tu configuración de Firebase

const db = getFirestore(app); // Inicializa Firestore usando tu configuración

const AddAccessoryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrls, setImageUrls] = useState([""]); // Estado para múltiples URLs
  const [stock, setStock] = useState(false); // Estado para el stock (true/false)
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Agregar el accesorio a Firestore
      const collectionRef = collection(db, `accesorios/${category}/items`);
      await addDoc(collectionRef, {
        name,
        description,
        price: parseFloat(price),
        imageUrls, // Enviar el array de URLs
        stock, // Enviar el valor de stock
      });

      alert("Accesorio agregado con éxito.");
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImageUrls([""]);
      setStock(false);
    } catch (error) {
      console.error("Error al agregar el accesorio: ", error);
      alert("Hubo un error al agregar el accesorio.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddImageUrl = () => {
    setImageUrls([...imageUrls, ""]); // Agrega un nuevo input vacío al array
  };

  const handleImageUrlChange = (index, value) => {
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = value; // Actualiza la URL correspondiente
    setImageUrls(updatedUrls);
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      my={"12dvh"}
      bg="gray.100"
      borderRadius="md"
      minH={"100dvh"}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={4} p={"25px"}>
          <FormControl isRequired>
            <FormLabel>Nombre del Accesorio</FormLabel>
            <Input
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              bg={"white"}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Descripción</FormLabel>
            <Textarea
              placeholder="Descripción del accesorio"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              bg={"white"}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Precio</FormLabel>
            <Input
              type="number"
              placeholder="Precio"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              bg={"white"}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Categoría</FormLabel>
            <Select
              placeholder="Seleccionar Categoría"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              bg={"white"}
            >
              <option value="acero">Acero</option>
              <option value="brazaletes">Brazaletes</option>
              <option value="fiesta">Fiesta</option>
              <option value="gemas">Gemas</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>URLs de Imágenes</FormLabel>
            {imageUrls.map((url, index) => (
              <Stack direction="row" align="center" key={index} spacing={2}>
                <Input
                  type="url"
                  placeholder={`URL de la imagen ${index + 1}`}
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
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

          {/* Switch para Stock */}
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="stock" mb="0">
              ¿En Stock?
            </FormLabel>
            <Switch
              id="stock"
              isChecked={stock}
              onChange={(e) => setStock(e.target.checked)}
              colorScheme="teal"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isLoading}
            disabled={
              !name || !price || !category || imageUrls.some((url) => !url)
            }
          >
            Agregar Accesorio
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddAccessoryForm;
