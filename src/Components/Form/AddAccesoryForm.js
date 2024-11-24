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
} from "@chakra-ui/react";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Importa Firestore
import { app } from "../../firebaseConfig"; // Importa tu configuración de Firebase

const db = getFirestore(app); // Inicializa Firestore usando tu configuración

const AddAccessoryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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
        imageUrl,
      });

      alert("Accesorio agregado con éxito.");
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImageUrl("");
    } catch (error) {
      console.error("Error al agregar el accesorio: ", error);
      alert("Hubo un error al agregar el accesorio.");
    } finally {
      setIsLoading(false);
    }
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
            <FormLabel>URL de la Imagen</FormLabel>
            <Input
              type="url"
              placeholder="URL de la imagen"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              bg={"white"}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isLoading}
            disabled={!name || !price || !category || !imageUrl}
          >
            Agregar Accesorio
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddAccessoryForm;
