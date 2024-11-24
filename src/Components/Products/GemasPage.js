import React, { useEffect, useState } from "react";
import { Box, Grid, Image, Text, Spinner, Heading } from "@chakra-ui/react";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Importa las funciones necesarias
import { app } from "../../firebaseConfig"; // Importa la instancia de Firebase

const db = getFirestore(app); // Inicializa Firestore a partir de `app`

const GemasPage = () => {
  const [items, setItems] = useState([]); // Estado para los accesorios
  const [loading, setLoading] = useState(true); // Estado para el spinner de carga

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Accede a la colección `accesorios/gemas/items`
        const querySnapshot = await getDocs(
          collection(db, "accesorios/gemas/items")
        );
        const itemsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsList); // Actualiza el estado con los documentos obtenidos
      } catch (error) {
        console.error("Error al cargar los accesorios: ", error);
      } finally {
        setLoading(false); // Oculta el spinner después de cargar los datos
      }
    };

    fetchItems();
  }, []);

  return (
    <Box maxW="1200px" mx="auto" p={6} minH={"100dvh"}>
      {loading ? (
        <Spinner size="xl" color="teal.500" />
      ) : (
        <>
          <Heading
            as="h1"
            size="2xl"
            mb={6}
            textAlign="center"
            color="#aa8c76"
            fontFamily={'"Cormorant Garamond", serif'}
          >
            Gemas
          </Heading>
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {items.map((item) => (
              <Box
                key={item.id}
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
                transition="0.3s"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  w="100%"
                  h="200px"
                  objectFit="cover"
                />
                <Box p={4}>
                  <Text fontSize="xl" fontWeight="bold" color="#31302c">
                    {item.name}
                  </Text>
                  <Text fontSize="md" color="gray.600">
                    {item.description}
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="#aa8c76" mt={2}>
                    ${item.price.toFixed(2)}
                  </Text>
                </Box>
              </Box>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default GemasPage;
