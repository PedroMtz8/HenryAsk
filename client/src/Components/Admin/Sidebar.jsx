import {
  Avatar,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiBriefcase, FiHome, FiMenu, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getUserData } from "../../slices/userSlice";
import { useAuth } from "../AuthComponents/AuthContext";
import NavItem from "./NavItem";

const Sidebar = () => {
  const navigate = useNavigate();
  const [navSize, setNavSize] = useState("large");

  const dispatch = useDispatch();

  const { user } = useAuth();
  let token = user.accessToken;

  const requests = useSelector((state) => state.user.requests);

  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getUserData(user.accessToken));
  }, [dispatch]);

  return (
    <Flex
      pos="relative"
      w={(navSize === "small") ? "6rem" : "16rem"}
      minH="100vh"
      flexDir="column"
      backgroundColor="yellow.200"
      color="black"
    >
      <Flex 
      flexDir="column" 
      alignItems={(navSize === "small") ? "center" : "flex-start"} 
      justifyContent="flex-start"
      as="nav">
        <IconButton 
          background="none"
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          title="Menu"          
          onClick={e => setNavSize((navSize === "small") ? "large" : "small")}
        />
        <NavItem navSize={navSize}
          icon={FiHome}
          title="Tablero"
          url="/admin"
        />
        <NavItem navSize={navSize}
          icon={FiUser}
          title="Cuentas"
          url="/admin/accounts"
        />
        <NavItem navSize={navSize}
          icon={FiBriefcase}
          title={`Peticiones (${requests.length})`}
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
      <Flex flexDir="column" p={4}>
        <Avatar size="sm" src={currentUser.avatar} m="auto" />
        <Heading
          as="h3"
          size="sm"
          m="auto"
          display={navSize === "small" ? "none" : "flex"}
          mt="5px"
        >
          {currentUser?.userSlack}
        </Heading>
        <Text
          m="auto"
          color="gray"
          display={navSize === "small" ? "none" : "flex"}
        >
          {" "}
          {currentUser.rol}{" "}
        </Text>
        <Button
          mt="15px"
          size="sm"
          variant="outline"
          colorScheme="red"
          onClick={() => navigate("/home")}
          display={navSize === "small" ? "none" : "flex"}
        >
          Volver al Home
        </Button>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
