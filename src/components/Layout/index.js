import React from "react";
import { Container } from "@chakra-ui/react";
import Header from "../Header";

function Layout({ children }) {
  return (
    <>
      <Container maxW="80em">
        <Header />
        {children}
      </Container>
    </>
  );
}

export default Layout;
