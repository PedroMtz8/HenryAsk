import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, previousPage, setPage } from "../../slices/userSlice";

const PaginatedAdmin = ({ maxPages }) => {
  const dispatch = useDispatch();

  const currentPage = useSelector((state) => state.user.page);

  const components = [];

  function changePage(type, number) {
    switch (type) {
      case "next":
        if (currentPage < maxPages) dispatch(nextPage());
        break;
      case "previous":
        if (currentPage > 1) dispatch(previousPage());
        break;
      default:
        dispatch(setPage(number));
        break;
    }
  }

  for (let i = 1; i <= maxPages; i++) {
    components.push(
      <div key={i} style={{ display: "inline-block", padding: "7px" }}>
        <Button
          style={
            currentPage === i
              ? { backgroundColor: "gray", color: "white" }
              : { backgroundColor: "#ffff01" }
          }
          size={currentPage === i ? "md" : "sm"}
          onClick={() => changePage("number", i)}
          variant="outline"
        >
          {i}
        </Button>
      </div>
    );
  }

  return (
    <Flex justifyContent={"center"} alignItems="center">
      <Button
        isDisabled={currentPage === 1 ? true : false}
        backgroundColor="#ffff01"
        onClick={() => changePage("previous")}
        size="sm"
        variant="outline"
      >
        {"<"}
      </Button>
      {components}
      <Button
        size="sm"
        isDisabled={currentPage === maxPages ? true : false}
        backgroundColor="#ffff01"
        onClick={() => changePage("next")}
        variant="outline"
      >
        {">"}
      </Button>
    </Flex>
  );
};

export default PaginatedAdmin;
