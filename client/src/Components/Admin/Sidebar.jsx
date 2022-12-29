import { Divider, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiBriefcase, FiHome, FiMenu, FiUser } from "react-icons/fi";
import { Navigate, useNavigate } from "react-router-dom";
import NavItem from "./NavItem";

const Sidebar = () => {
  const [navSize, setNavSize] = useState("large");
  const navigate = useNavigate();

  const handleMenuSize = () => {
    if (navSize === "small") {
      setNavSize("large");
    } else {
      setNavSize("small");
    }
  };

  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.5)"
      w={navSize === "small" ? "75px" : "220px"}
      borderRadius={navSize === "small" ? "15px" : "30px"}
      flexDir="column"
      justifyContent="space-between"
      backgroundColor="#ffff01"
    >
      <Flex p="5%" flexDir="column" alignItems="flex-start" as="nav">
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={handleMenuSize}
        />
        <NavItem navSize={navSize} icon={FiHome} title="Tablero" url="/admin" />
        <NavItem
          navSize={navSize}
          icon={FiUser}
          title="Cuentas"
          url="/admin/accounts"
        />
        <NavItem
          navSize={navSize}
          icon={FiBriefcase}
          title="Peticiones"
          url="/admin/requests"
        />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems="flex-start"
        mb={4}
      ></Flex>

      <Divider display={navSize === "small" ? "none" : "flex"} />
      <Flex
        flexDir="column"
        p={4}
        display={navSize === "small" ? "none" : "flex"}
      >
        <Heading as="h3" size="sm">
          Nombre del usuario
        </Heading>
        <Text color="gray">Admin</Text>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
