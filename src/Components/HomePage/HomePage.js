import React from "react";
import MainContent from "./MainContent";
import SaleBanner from "./SaleBanner";
import WhyChooseUs from "./WhyChooseUs";
import AboutUs from "./AboutUs";
import Contact from "../Contact/Contact";
import FloatingWhatsapp from "../FloatingButtons/Whatsapp";
import FloatingCart from "../FloatingButtons/FloatingCart";
import { Box } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box>
      <MainContent />
      <SaleBanner />
      <WhyChooseUs />
      <AboutUs />
      <FloatingWhatsapp />
      <FloatingCart />
      <Contact />
    </Box>
  );
};

export default HomePage;
