import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Image,
  Text,
  Spinner,
  Heading,
  Badge,
  Button,
} from "@chakra-ui/react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { useCart } from "../../CartContext";

const db = getFirestore(app);

const BrazaletesPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "accesorios/brazaletes/items")
        );
        const itemsList = querySnapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            ...data,
            imageUrl: Array.isArray(data.imageUrls)
              ? data.imageUrls[0]
              : data.imageUrl,
          };
        });

        // Sincroniza las cantidades desde el carrito
        const syncedItems = itemsList.map((item) => ({
          ...item,
          quantity:
            cart.find((cartItem) => cartItem.id === item.id)?.quantity || 0,
        }));

        setItems(syncedItems);
      } catch (error) {
        console.error("Error al cargar los accesorios: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [cart]); // Re-sincroniza cuando el carrito cambia

  const handleIncrement = (item) => {
    addToCart(item);
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.id === item.id ? { ...i, quantity: (i.quantity || 0) + 1 } : i
      )
    );
  };

  const handleDecrement = (item) => {
    updateQuantity(item.id, -1);
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.id === item.id && i.quantity > 0
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
    );
  };

  return (
    <Box maxW="1200px" mx="auto" px={6} py={"12dvh"} minH={"100dvh"}>
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
            Brazaletes
          </Heading>
          <Grid
            templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            gap={6}
            justifyItems="center"
          >
            {items.map((item) => (
              <Box
                key={item.id}
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
                transition="0.3s"
                minW={{ base: "90dvw", sm: "320px" }}
                width={"auto"}
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
                  <Badge
                    mt={2}
                    px={3}
                    py={1}
                    borderRadius="md"
                    color="white"
                    bg={item.stock ? "#aa8c76" : "red.500"}
                    fontSize="sm"
                  >
                    {item.stock ? "En Stock" : "Fuera de Stock"}
                  </Badge>
                </Box>
                <Box m={4} display="flex" alignItems="center" gap={4}>
                  <Button
                    onClick={() => handleDecrement(item)}
                    colorScheme="red"
                    size="sm"
                    disabled={item.quantity === 0}
                  >
                    -
                  </Button>
                  <Text>{item.quantity || 0}</Text>
                  <Button
                    onClick={() => handleIncrement(item)}
                    colorScheme="teal"
                    size="sm"
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => removeFromCart(item.id)}
                    colorScheme="gray"
                    size="sm"
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

export default BrazaletesPage;
