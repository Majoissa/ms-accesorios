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
import ShowAllAlumns from "./Components/ShowAllAlumns/ShowAllAlumns";
import ShowAllRestaurants from "./Components/ShowAllRestaurants/ShowAllRestaurants";
import EditStudentForm from "./Components/Form/EditStudentForm";
import EditRestaurantForm from "./Components/Form/EditRestaurantForm";
import GemasPage from "./Components/Products/GemasPage";
import { AuthProvider } from "./Components/AuthContext";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Box as="header">
          <Nav />
          <Route path="/" component={HomePage} />
        </Box>
        <Route path="/Ingressar-alumnes" component={StudentsForm} />
        <Route path="/veure-alumnes" component={ShowAllAlumns} />
        <Route path="/success" component={Success} />
        <Route path="/agregar-accesorios" component={AddAccessoryForm} />
        <Route path="/veure-restaurants" component={ShowAllRestaurants} />
        <Route path="/success-restaurant" component={SuccessRest} />
        <Route path="/edit-alumn/:id" component={EditStudentForm} />
        <Route path="/edit-restaurant/:id" component={EditRestaurantForm} />
        <Route path="/gemas" component={GemasPage} />
        <Box as="footer" flex="0 0 auto">
          <Footer />
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
