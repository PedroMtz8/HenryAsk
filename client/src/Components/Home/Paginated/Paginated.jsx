import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { savePosts, changePage, postLoading } from "../../../slices/paginatedSlice";
import { Flex, SimpleGrid, Skeleton } from "@chakra-ui/react";
import CardsHome from "../../Card/CardsHome";
import PaginatedButtons from "./PaginatedButtons/PaginatedButtons.jsx";
import SearchBar from "./SearchBar/SearchBar";
import API_URL from "../../../config/environment";
import { useAuth } from "../../AuthComponents/AuthContext";
import axios from "axios";
import { useWindowWidth } from '@react-hook/window-size'

const Paginated = () => {
  const { user } = useAuth();
  let token = user.accessToken;
  const widthScreen = useWindowWidth()

  const dispatch = useDispatch();

  const paginated = useSelector((state) => state.paginated);

  useEffect(() => {
    const getPosts = async () => {
      dispatch(postLoading(true));
      const res = await axios.get(
        API_URL +
        `/posts?page=1&q=${paginated.titleFilter}&module=${paginated.moduleFilter}&tags=${paginated.tagsFilter}&sort=${paginated.order}`,
        { headers: { Authorization: "Bearer " + token } }
      );

      dispatch(savePosts(res.data));
      dispatch(changePage('1'));
    };

    getPosts();
  }, [
    paginated.moduleFilter,
    paginated.tagsFilter,
    paginated.titleFilter,
  ]);

  useEffect(() => {
    const getPosts = async () => {

      dispatch(postLoading(true));
      const res = await axios.get(
        API_URL +
        `/posts?page=${paginated.currentPage}&q=${paginated.titleFilter}&module=${paginated.moduleFilter}&tags=${paginated.tagsFilter}&sort=${paginated.order}`,
        { headers: { Authorization: "Bearer " + token } }
      );

      dispatch(savePosts(res.data));
    };

    getPosts();
  }, [paginated.currentPage, paginated.order,])



  return (
    <Flex
      position="relative"
      bg="#1F1F1F"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      minH="90vh"
      p={{base: '0.5rem', sm: '1rem'}}
      gap="1rem"
    >
      <SearchBar />
      {paginated.loading?
        <SimpleGrid columns={widthScreen > 1120 ? 2 : 1} spacing={5} w={ widthScreen > 1120 ? { base: '90%', lg: '70%' } : { base: "100%", sm: "95%", md: "90%", lg: "85%" }}>
          <Skeleton borderRadius={5} h={100}>x</Skeleton>
          <Skeleton borderRadius={5} h={100}>x</Skeleton>
          <Skeleton borderRadius={5} h={100}>x</Skeleton>
          <Skeleton borderRadius={5} h={100}>x</Skeleton>
          <Skeleton borderRadius={5} h={100}>x</Skeleton>
          <Skeleton borderRadius={5} h={100}>x</Skeleton>
          <Skeleton borderRadius={5} h={100}>x</Skeleton>
          <Skeleton borderRadius={5} h={100}>x</Skeleton>
          <Skeleton borderRadius={5} h={100}>x</Skeleton>
          <Skeleton borderRadius={5} h={100}>x</Skeleton>
        </SimpleGrid>
        : (
          <>
            <CardsHome />
            <PaginatedButtons />
          </>
        )}
    </Flex>
  );
};

export default Paginated;
