import {
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavItem = ({ navSize, title, icon, active, url }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(url);
  };

  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          p={3}
          borderRadius={8}
          _hover={{
            textDecor: "none",
            backgroundColor: "white",
            fontSize: "17px",
          }}
          w={navSize == "large" && "100%"}
          onClick={handleNavigate}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon fontSize="xl" as={icon} />
              <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};

export default NavItem;
