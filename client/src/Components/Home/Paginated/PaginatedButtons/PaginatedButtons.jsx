import {useSelector} from 'react-redux'
import {
    HStack,
    Button,
    Text
} from "@chakra-ui/react";

const PaginatedButtons = () => {

    const currentPage = useSelector((state) => state.paginated.currentPage)
    const maxPages = useSelector((state) => state.paginated.maxPages)

    console.log(currentPage)
    console.log("............")
    console.log(maxPages)

    const showButtons = (pN, cP) => {

        const buttons = []
        
        for (let i = 1; i <= pN; i++) {
    
            buttons.push(<Button key={i}> {i} </Button>)
    
        }
    
        return buttons
    }

    return (
        <HStack spacing={2} >
            <Button > <Text> {"<"} </Text> </Button>
            {showButtons(maxPages, currentPage)}
            <Button > <Text> {">"} </Text> </Button>
        </HStack>
    )
}

export default PaginatedButtons;
