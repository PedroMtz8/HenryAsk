import { useDispatch, useSelector } from 'react-redux'
import { incrementPage, decrementPage } from '../../../../slices/paginatedSlice';
import {
    HStack,
    Button,
    Text
} from "@chakra-ui/react";

const PaginatedButtons = () => {

    const dispatch = useDispatch()

    const currentPage = useSelector((state) => state.paginated.currentPage);
    const maxPages = useSelector((state) => state.paginated.maxPages);

    const showButtons = (cP, mP) => {

        const buttons = [];

        let i = 1
        let j = mP
        const dif = mP - cP;

        if ((cP > 4 && mP > 6)) {

            buttons.push(<Button key={'1n'} > {'1'} </Button>, <Button key={'...i'} > {'...'} </Button>); 

            i = cP - ((dif > 3 || dif === 2)? 2 : (dif === 3)? 1: (dif === 1)? 3 : (dif === 0)? 4 : 2 )

        }       


        for (; i <= j ; i++) {
     
            buttons.push(<Button key={i} bg={i === cP ? "red.300" : null}> {i} </Button>)

        }


        /* if ((cP > 4 && mP > 6)) {

            buttons.push(<Button key={'1n'} > {'1'} </Button>, <Button key={'...i'} > {'...'} </Button>); 

            i = cP - ((dif > 3 || dif === 2)? 2 : (dif === 3)? 1: (dif === 1)? 3 : (dif === 0)? 4 : 2 )

        }       
                
        for (; (i <= j) && (i <= mP); i++) {

            if (i <= 0) {
                j++;
                continue;
            }       
            buttons.push(<Button key={i} bg={i === cP ? "red.300" : null}> {i} </Button>)

        }

        if (mP > 6 && (mP - cP > 2)) {

            buttons.push(<Button key={'...f'} > {'...'} </Button>, <Button key={mP} > {mP} </Button>);
        }
 */
        (cP > 1) && buttons.unshift(<Button key={'<'} onClick={(e) => cP > 1? dispatch(decrementPage()) : null} > {'<'} </Button>);
        (mP > cP) && buttons.push(<Button key={'>'} onClick={(e) => cP < mP? dispatch(incrementPage()) : null}> {'>'} </Button>);

        return buttons
    }

    return (
        <HStack spacing={2} >
            {showButtons(currentPage, maxPages)}
        </HStack>
    )
}

export default PaginatedButtons;
