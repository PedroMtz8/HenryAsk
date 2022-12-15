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

        const buttons = [];
        let i = 1;

        (cP > 1) && buttons.push(<Button key={'<'} >{"<"}</Button>);


        if (cP >= 5 && mP > 6) {

            buttons.push((<Button key={'1'}>1</Button>), (<Button key={'...1'}>{'...'}</Button>))

            i = (mP - cP <= 3) ? cP - (4 - (mP - cP)) : cP - 2

        }


        for (; (((mP - cP >= 3) &&  mP > 6)? i + 1: i) < mP; i++) {

            buttons.push(<Button key={i} bg={i === cP ? "red.300" : null}> {i} </Button>)

        }

        ((mP - cP >= 3) &&  mP > 6) && buttons.push(<Button key={'...2'} >{'...'}</Button>);
        buttons.push(<Button key={mP} bg={i === cP ? "red.300" : null}>{mP}</Button>);
        (cP < mP) && buttons.push(<Button key={'>'} >{">"}</Button>);

        return buttons
    }

    return (
        <HStack spacing={2} >
            {showButtons(currentPage, maxPages)}
        </HStack>
    )
}

export default PaginatedButtons;
