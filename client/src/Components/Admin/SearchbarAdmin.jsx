import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
} from "@chakra-ui/react";
import React from "react";

const SearchbarAdmin = () => {
  return (
    <div>
      <FormControl m="auto" fontSize=".9rem" mb="60px">
        <HStack
          align="center"
          bg="#F2F2F2"
          p="1% 2%"
          spacing="3.5%"
          borderRadius="1.5rem"
        >
          <InputGroup w="32%">
            <Input placeholder="Buscar" borderRadius="10rem" />
            <InputRightElement width="3rem">
              <SearchIcon fontSize="1.1rem" onClick={(e) => console.log(e)} />
            </InputRightElement>
          </InputGroup>
          <HStack w="32%">
            <Text w="4rem">Petición:</Text>
            <Select borderRadius="10rem">
              <option>----</option>
              <option>Registro</option>
              <option>Cambio de rol</option>
            </Select>
          </HStack>
          <HStack w="33%">
            <Text w="4rem">Estado:</Text>
            <Select borderRadius="10rem">
              <option>---</option>
              <option>Pendiente</option>
            </Select>
          </HStack>
        </HStack>
      </FormControl>
    </div>
  );
};

export default SearchbarAdmin;
