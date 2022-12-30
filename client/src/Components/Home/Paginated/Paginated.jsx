import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { savePosts, changePage } from "../../../slices/paginatedSlice";
import { Flex, Stack, Skeleton } from "@chakra-ui/react";
import CardsHome from "../../Card/CardsHome";
import PaginatedButtons from "./PaginatedButtons/PaginatedButtons.jsx";
import SearchBar from "./SearchBar/SearchBar";
import API_URL from "../../../config/environment";
import { useAuth } from "../../AuthComponents/AuthContext";
import axios from "axios";

const Paginated = () => {
  const { user } = useAuth();
  let token = user.accessToken;

  const dispatch = useDispatch();

  const paginated = useSelector((state) => state.paginated);

  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get(
        API_URL +
        `/posts?page=1&q=${paginated.titleFilter}&module=${paginated.moduleFilter}&tags=${paginated.tagsFilter}&sort=${paginated.order}`,
        { headers: { Authorization: "Bearer " + token } }
      );

      dispatch(savePosts(res.data));
      dispatch(changePage('1'));
      setLoadingPosts(false);
    };

    getPosts();
  }, [
    paginated.moduleFilter,
    paginated.tagsFilter,
    paginated.titleFilter,
  ]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get(
        API_URL +
        `/posts?page=${paginated.currentPage}&q=${paginated.titleFilter}&module=${paginated.moduleFilter}&tags=${paginated.tagsFilter}&sort=${paginated.order}`,
        { headers: { Authorization: "Bearer " + token } }
      );

      dispatch(savePosts(res.data));
      setLoadingPosts(false);
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
      p="1rem"
      gap="1rem"
    >
      <SearchBar />
      {loadingPosts ?
        <Stack w={"85%"} gap={3} /* bgColor="blue" position={"absolute"} zIndex={4} */>
          <Skeleton height="180px" />
          <Skeleton height="180px" />
          <Skeleton height="180px" />
          <Skeleton height="180px" />
          <Skeleton height="180px" />
          <Skeleton height="180px" />
          <Skeleton height="180px" />
          <Skeleton height="180px" />
          <Skeleton height="180px" />
          <Skeleton height="180px" />
        </Stack>
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
