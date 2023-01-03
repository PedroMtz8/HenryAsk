import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Img,
  HStack,
  VStack,
  Text,
  useToast
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import QuestionModal from "../Modals/QuestionModal";
import { Link as RouteLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../slices/userSlice";
import { useAuth } from "../AuthComponents/AuthContext";

export default function NavBar() {
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userData = useSelector((state) => state.user.user);

  const toast = useToast()

  const { user, signout } = useAuth();

  const logout = async () => {
    await signout();
  };

  useEffect(() => {
    dispatch(getUserData(user.accessToken))
  }, []);

  if(userData && userData.status === "Esperando") {
     toast({
      description: "Tu confirmación esta pendiente, espera a que sea aprobada",
      duration: 6000,
      isClosable: true,
      status: "info",
      position: "top",
    })
    signout()
  } 

  return (
    <>
      <Box bg={useColorModeValue("black", "black")} px={4}>
        <Flex h={"96px"} 
        alignItems="center" 
        justifyContent="space-between"
        px={{base: "0rem", md: "1rem"}}>
          <RouteLink to={"/home"}>
            <Flex
              alignItems={"center"}
              h={"30px"}
              w={{ base: "100px", sm: "120px", md: "120px", lg: "120px" }}
            >
              <Img src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png" />
            </Flex>
          </RouteLink>
          <Flex alignItems={"center"}>
            <Stack
              direction={"row"}
              spacing={{ base: 0, md: 7, lg: 7 }}
              margin={0}
            >
              <QuestionModal title={"Hacer pregunta"} />
              <Flex>
                <Menu>
                  <MenuButton
                    transition="all 0.3s"
                    _focus={{ boxShadow: "none" }}
                  >
                    <Avatar
                      size={"md"}
                      src={userData.avatar}
                    />
                  </MenuButton>
                  <MenuList
                    bg={useColorModeValue("white", "gray.900")}
                    borderColor={useColorModeValue("gray.200", "gray.700")}
                  >
                    
                      <Text fontWeight={700} ml={3}>{userData.userSlack}</Text>
                    <RouteLink to={"/home"}>
                      <MenuItem> Home </MenuItem>
                    </RouteLink>
                    <RouteLink to={"/profile"}>
                      <MenuItem> Profile </MenuItem>
                    </RouteLink>
                    {
                      userData.rol === "Administrador" ?
                      <RouteLink to={"/admin"}>
                      <MenuItem> Panel de Admin </MenuItem>
                    </RouteLink>
                      :
                    null
                    }
                    <MenuDivider />
                    <MenuItem onClick={logout}>Log out</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
