import { useDispatch, useSelector } from 'react-redux'
import { incrementPage, decrementPage, changePage } from '../../../../slices/paginatedSlice';
import showButtons from './showButtons';
import {
    HStack,
    Button
} from "@chakra-ui/react";

const PaginatedButtons = () => {

    const dispatch = useDispatch()

    const currentPage = useSelector((state) => state.paginated.currentPage);
    const maxPages = useSelector((state) => state.paginated.maxPages);

    const clickButtonNumbers = (e) => {

        dispatch(changePage(e.target.name));
        window.scroll(0, 0)

    }

    const clickSideButtons = (e) => {
        if (currentPage > 1 && e.target.name === '<') {
            dispatch(decrementPage());
            window.scroll(0, 0)
        } else if (currentPage < maxPages && e.target.name === '>') {
            dispatch(incrementPage())
            window.scroll(0, 0)
        }
    }
    
    return (
        <HStack spacing={2} >
            <Button key={'<'} name={'<'} onClick={clickSideButtons} > {'<'} </Button>
            {showButtons(currentPage, maxPages).map(
                (elem, i ) => <Button key={i}
                                      name={elem}
                                      bg={currentPage !== elem? "#E2E8F0" : "#FFFF01"}
                                      onClick={clickButtonNumbers} 
                                      > 
                                      {elem} 
                              </Button>
            )}
            <Button key={'>'} name={'>'} onClick={clickSideButtons}> {'>'} </Button>
        </HStack>
    )
}

export default PaginatedButtons;
