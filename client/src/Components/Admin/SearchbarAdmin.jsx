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
import { filterByRol, getByMail } from "../../slices/userSlice";
import { useAuth } from "../AuthComponents/AuthContext";

const SearchbarAdmin = ({ name, op1, op2, op3, op4, op5, isAccounts }) => {
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

    dispatch(getByMail({ mail: search.toLowerCase(), page, token }));
  };

  const handleChangeFilter = (e) => {
    e.preventDefault();

    dispatch(filterByRol(e.target.value));
  };

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
          <InputGroup w="50%">
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
          <HStack w="50%">
            <Text w="4rem"> {name}:</Text>
            <Select onChange={handleChangeFilter} borderRadius="10rem">
              <option>----</option>
              <option value={op1}> {op1} </option>
              <option value={op2}> {op2} </option>
              {isAccounts && (
                <>
                  <option value={op3}> {op3} </option>
                  <option value={op4}> {op4} </option>
                  <option value={op5}> {op5} </option>
                </>
              )}
            </Select>
          </HStack>
        </HStack>
      </FormControl>
    </div>
  );
};

export default SearchbarAdmin;
