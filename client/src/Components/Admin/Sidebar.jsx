import {
  Avatar,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiBriefcase, FiHome, FiMenu, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getUserData } from "../../slices/userSlice";
import { useAuth } from "../AuthComponents/AuthContext";
import NavItem from "./NavItem";

const Sidebar = () => {
  const [navSize, setNavSize] = useState("large");
  const navigate = useNavigate();
  const [isLargerThan30em] = useMediaQuery("(min-width: 30em)");

  const dispatch = useDispatch();

  const { user } = useAuth();
  let token = user.accessToken;

  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getUserData(user.accessToken));
  }, [dispatch]);

  const handleMenuSize = () => {
    if (navSize === "small") {
      setNavSize("large");
    } else {
      setNavSize("small");
    }
  };

  return (
    <Flex
      pos="relative"
      h={{ base: navSize === "small" ? "10vh" : "20vh", sm: "100vh" }}
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.5)"
      maxW={{ base: "100vw", sm: navSize === "small" ? "4rem" : "12rem" }}
      flexDir={{ base: "row", sm: "column" }}
      backgroundColor="#ffff01"
      justifyContent={isLargerThan30em ? "flex-start" : "space-between"}
      alignItems={isLargerThan30em ? "center" : "center"}
      gap={isLargerThan30em ? 4 : 0}
      px={{ base: 5, sm: isLargerThan30em ? "center" : "center" }}
    >
      <Flex flexDir="column" alignItems={"center"} as="nav">
        <IconButton
          background="none"
          mt={isLargerThan30em ? 5 : 0}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={handleMenuSize}
        />
        {isLargerThan30em ? (
          <Flex flexDir={{ base: "row", sm: "column" }}>
            <NavItem
              navSize={navSize}
              icon={FiHome}
              title="Tablero"
              url="/admin"
            />
            <NavItem
              navSize={navSize}
              icon={FiUser}
              title="Cuentas"
              url="/admin/accounts"
            />
            <NavItem
              navSize={navSize}
              icon={FiBriefcase}
              title={`Peticiones`}
              url="/admin/requests"
            />
          </Flex>
        ) : (
          <>
            {navSize === "small" ? (
              <></>
            ) : (
              <Flex>
                <NavItem
                  navSize={navSize}
                  icon={FiHome}
                  title="Tablero"
                  url="/admin"
                />
                <NavItem
                  navSize={navSize}
                  icon={FiUser}
                  title="Cuentas"
                  url="/admin/accounts"
                />
                <NavItem
                  navSize={navSize}
                  icon={FiBriefcase}
                  title={`Peticiones`}
                  url="/admin/requests"
                />
              </Flex>
            )}
          </>
        )}
      </Flex>
      <Divider
        display={{ base: "none", sm: navSize === "small" ? "none" : "flex" }}
        flexDir={{ base: "row", sm: "column" }}
      />

      <Flex
        flexDir={{ base: "row", sm: "column" }}
        alignItems="center"
        textAlign={"center"}
        gap={2}
      >
        {!isLargerThan30em ? null : (
          <>
            <Avatar
              size="sm"
              src={currentUser.avatar}
              mt={{ base: 0, sm: navSize === "small" ? 5 : 0 }}
            />
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
              size="sm"
              variant="outline"
              colorScheme="red"
              onClick={() => navigate("/home")}
              display={navSize === "small" ? "none" : "flex"}
            >
              Volver al Home
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
