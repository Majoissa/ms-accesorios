import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Image,
  Text,
  Button,
  Spinner,
  Heading,
  useToast,
  Select,
} from "@chakra-ui/react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { useLocation } from "wouter";

const db = getFirestore(app);

const EditProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, navigate] = useLocation();
  const toast = useToast();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["acero", "brazaletes", "fiesta", "gemas"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = [];

        for (const category of categories) {
          const querySnapshot = await getDocs(
            collection(db, `accesorios/${category}/items`)
          );
          const categoryProducts = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              category,
              ...data,
              imageUrl: Array.isArray(data.imageUrls)
                ? data.imageUrls[0]
                : data.imageUrl,
            };
          });
          allProducts.push(...categoryProducts);
        }
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error("Error al cargar los productos: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (product) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que quieres eliminar el producto "${product.name}"?`
    );
    if (!confirmDelete) return;

    try {
      const productDoc = doc(
        db,
        `accesorios/${product.category}/items`,
        product.id
      );
      await deleteDoc(productDoc);

      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== product.id)
      );

      toast({
        title: "Producto eliminado.",
        description: `El producto "${product.name}" ha sido eliminado correctamente.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error al eliminar el producto: ", error);
      toast({
        title: "Error.",
        description: "Hubo un problema al eliminar el producto.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === "") {
      // Mostrar todos los productos
      setFilteredProducts(products);
    } else {
      // Filtrar por categoría
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

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
          <Box mb={6} textAlign="center">
            <Select
              placeholder="Todos"
              value={selectedCategory}
              onChange={handleCategoryChange}
              maxW="300px"
              mx="auto"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category || "Todos"}
                </option>
              ))}
            </Select>
          </Box>
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {filteredProducts.map((product) => (
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
                  <Button
                    mt={4}
                    ml={2}
                    colorScheme="red"
                    onClick={() => handleDelete(product)}
                  >
                    Eliminar
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
