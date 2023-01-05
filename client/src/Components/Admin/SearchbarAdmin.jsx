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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByMail, getUserByRol, getUsers } from "../../slices/userSlice";
import { useAuth } from "../AuthComponents/AuthContext";

const SearchbarAdmin = ({
  name,
  op1,
  op2,
  op3,
  op4,
  op5,
  handleChangeFilter,
  setFilter,
}) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const page = useSelector((state) => state.user.page);

  const { user } = useAuth();
  let token = user.accessToken;

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFilter("");
    dispatch(getByMail({ mail: search.toLowerCase(), page, token }));
  };

  return (
    <div>
      <FormControl
        m="auto"
        fontSize=".9rem"
        mb="60px"
        w={{ base: "50%", sm: "100%", md: "100%", lg: "100%" }}
      >
        <HStack
          align="center"
          bg="#F2F2F2"
          p="1% 2%"
          spacing="3.5%"
          borderRadius="10px"
        >
          <InputGroup
            w={{ base: "40%", md: "70%", lg: "100%" }}
            display={{ base: "flex" }}
          >
            <Input
              placeholder="Mail..."
              borderRadius="10rem"
              value={search}
              onChange={handleChange}
            />
            <InputRightElement width="3rem" onClick={handleSubmit}>
              <SearchIcon fontSize="1.1rem" />
            </InputRightElement>
          </InputGroup>
          <HStack w={{ base: "40%", md: "30%", lg: "60%" }}>
            <Text w="4rem"> {name}:</Text>
            <Select onChange={handleChangeFilter} borderRadius="10rem">
              <option value={""}>----</option>
              <option value={op1}> {op1} </option>
              <option value={op2}> {op2} </option>
              <option value={op3}> {op3} </option>
              <option value={op4}> {op4} </option>
              <option value={op5}> {op5} </option>
            </Select>
          </HStack>
        </HStack>
      </FormControl>
    </div>
  );
};

export default SearchbarAdmin;
