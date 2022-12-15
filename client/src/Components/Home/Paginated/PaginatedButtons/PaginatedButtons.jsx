import { useSelector } from 'react-redux'
import {
    HStack,
    Button,
    Text
} from "@chakra-ui/react";

const PaginatedButtons = () => {

    const currentPage = useSelector((state) => state.paginated.currentPage)
    const maxPages = useSelector((state) => state.paginated.maxPages)

    const showButtons = (cP, mP) => {

        const buttons = []
        let i = 1

        if (cP >= 2) {

            buttons.push(<Button >{"<"}</Button>)

            if ((cP >= 5 && mP > 6)) {

                buttons.push(<Button >1</Button>, <Button >...</Button>)
                i = cP - 2
            }

        }

        for (; i <= mP; i++) {

            buttons.push(<Button key={i}> {i} </Button>)

        }

        (mP - cP > 4) && buttons.push(<Button >...</Button>)
        (cP >= mP) && buttons.push(<Button >{">"}</Button>)

        return buttons
    }

    return (
        <HStack spacing={2} >
            {showButtons(currentPage, maxPages)}
        </HStack>
    )
}

export default PaginatedButtons;
