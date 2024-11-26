import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Image,
  Text,
  Button,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Importa Firestore
import { app } from "../../firebaseConfig"; // Importa tu configuración de Firebase
import { useLocation } from "wouter";

const db = getFirestore(app); // Inicializa Firestore usando tu configuración

const EditProductsPage = () => {
  const [products, setProducts] = useState([]); // Estado para los productos
  const [loading, setLoading] = useState(true); // Estado para el spinner de carga
  const [, navigate] = useLocation(); // Navegación con `wouter`

  const categories = ["acero", "brazaletes", "fiesta", "gemas"]; // Categorías disponibles

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = [];
        // Itera sobre cada categoría para obtener sus productos
        for (const category of categories) {
          const querySnapshot = await getDocs(
            collection(db, `accesorios/${category}/items`)
          );
          const categoryProducts = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              category, // Añadimos la categoría al producto
              ...data,
              imageUrl: Array.isArray(data.imageUrls)
                ? data.imageUrls[0]
                : data.imageUrl, // Primera URL si es un array
            };
          });
          allProducts.push(...categoryProducts);
        }
        setProducts(allProducts); // Actualiza el estado con todos los productos
      } catch (error) {
        console.error("Error al cargar los productos: ", error);
      } finally {
        setLoading(false); // Oculta el spinner después de cargar los datos
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box maxW="1200px" mx="auto" p={6} py={"12dvh"} minH={"100dvh"}>
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
            Editar Productos
          </Heading>
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {products.map((product) => (
              <Box
                key={product.id}
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
                transition="0.3s"
              >
                <Image
                  src={product.imageUrl} // Mostrar la imagen
                  alt={product.name}
                  w="100%"
                  h="200px"
                  objectFit="cover"
                />
                <Box p={4}>
                  <Text fontSize="xl" fontWeight="bold" color="#31302c">
                    {product.name}
                  </Text>
                  <Text fontSize="md" color="gray.600">
                    {product.description}
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="#aa8c76" mt={2}>
                    ${product.price.toFixed(2)}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Categoría: {product.category}
                  </Text>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    onClick={() =>
                      navigate(
                        `/editar-producto/${product.category}/${product.id}`
                      )
                    }
                  >
                    Editar
                  </Button>
                </Box>
              </Box>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default EditProductsPage;
