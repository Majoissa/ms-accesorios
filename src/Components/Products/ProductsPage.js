import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Image,
  Text,
  Spinner,
  Heading,
  Button,
  Badge,
  Select,
} from "@chakra-ui/react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { useCart } from "../../CartContext";

const db = getFirestore(app);

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

  const categories = ["", "acero", "brazaletes", "fiesta", "gemas"]; // "" para mostrar todos los productos

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = [];
        for (const category of categories.slice(1)) {
          // Excluye el primer elemento (vacío)
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

        // Sincroniza las cantidades desde el carrito
        const syncedProducts = allProducts.map((product) => ({
          ...product,
          quantity:
            cart.find((cartItem) => cartItem.id === product.id)?.quantity || 0,
        }));

        setProducts(syncedProducts);
        setFilteredProducts(syncedProducts);
      } catch (error) {
        console.error("Error al cargar los productos: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [cart]);

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

  const handleIncrement = (product) => {
    addToCart(product);
    setFilteredProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, quantity: (p.quantity || 0) + 1 } : p
      )
    );
  };

  const handleDecrement = (product) => {
    updateQuantity(product.id, -1);
    setFilteredProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id && p.quantity > 0
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
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
            textTransform={"uppercase"}
          >
            Todos los Productos
          </Heading>
          <Box mb={6} textAlign="center">
            <Select
              placeholder="Filtrar por categoría"
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
            justifyItems="center"
          >
            {filteredProducts.map((product) => (
              <Box
                key={product.id}
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
                transition="0.3s"
                minW={{ base: "90dvw", sm: "320px" }}
              >
                <Image
                  src={product.imageUrl}
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
                  <Badge
                    mt={2}
                    px={3}
                    py={1}
                    borderRadius="md"
                    color="white"
                    bg={product.stock ? "#aa8c76" : "red.500"}
                    fontSize="sm"
                  >
                    {product.stock ? "En Stock" : "Fuera de Stock"}
                  </Badge>
                </Box>
                <Box m={4} display="flex" alignItems="center" gap={4}>
                  <Button
                    onClick={() => handleDecrement(product)}
                    colorScheme="red"
                    size="sm"
                    disabled={!product.stock || product.quantity === 0}
                  >
                    -
                  </Button>
                  <Text>{product.quantity || 0}</Text>
                  <Button
                    onClick={() => handleIncrement(product)}
                    colorScheme="teal"
                    size="sm"
                    disabled={!product.stock}
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => removeFromCart(product.id)}
                    colorScheme="gray"
                    size="sm"
                    disabled={!product.stock}
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

export default ProductsPage;
