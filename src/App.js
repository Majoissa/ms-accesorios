import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Route } from "wouter";
import { Box } from "@chakra-ui/react";
import Nav from "./Components/Nav/Nav";
import Footer from "./Components/Footer/Footer";
import HomePage from "./Components/HomePage/HomePage";
import StudentsForm from "./Components/Form/StudentsForm";
import Success from "./Components/Form/Success";
import AddAccessoryForm from "./Components/Form/AddAccesoryForm";
import SuccessRest from "./Components/Form/SuccessRest";
import ShowAllRestaurants from "./Components/ShowAllRestaurants/ShowAllRestaurants";
import GemasPage from "./Components/Products/GemasPage";
import FiestaPage from "./Components/Products/FiestaPage";
import AceroPage from "./Components/Products/Acero";
import BrazaletesPage from "./Components/Products/Brazaletes";
import ProductsPage from "./Components/Products/ProductsPage";
import Contact from "./Components/Contact/Contact";
import AboutUsScreen from "./Components/Screens/AboutUsScreen";
import EditProductsPage from "./Components/Screens/EditProductsPage";
import EditAccessoryForm from "./Components/Screens/EditAccessoryPage";
import CartPage from "./Components/Screens/CartPage";
import { CartProvider } from "./CartContext";

function App() {
  return (
    <ChakraProvider>
      <CartProvider>
        <Box as="header">
          <Nav />
          <Route path="/" component={HomePage} />
        </Box>
        <Route path="/Ingressar-alumnes" component={StudentsForm} />
        <Route path="/success" component={Success} />
        <Route path="/agregar-accesorios" component={AddAccessoryForm} />
        <Route path="/veure-restaurants" component={ShowAllRestaurants} />
        <Route path="/success-restaurant" component={SuccessRest} />
        <Route path="/gemas" component={GemasPage} />
        <Route path="/fiesta" component={FiestaPage} />
        <Route path="/acero" component={AceroPage} />
        <Route path="/brazaletes" component={BrazaletesPage} />
        <Route path="/productos" component={ProductsPage} />
        <Route path="/contacto" component={Contact} />
        <Route path="/nosotros" component={AboutUsScreen} />
        <Route path="/editar-productos" component={EditProductsPage} />
        <Route path="/carrito" component={CartPage} />
        <Route
          path="/editar-producto/:category/:id"
          component={EditAccessoryForm}
        />
        <Box as="footer" flex="0 0 auto">
          <Footer />
        </Box>
      </CartProvider>
    </ChakraProvider>
  );
}

export default App;
