import {
    HStack,
    Button,
    Text
} from "@chakra-ui/react";

const buttonNumber = ["<", "1", "2", "3", "4", "5", ">"]

const PaginatedButtons = () => {
    return (
        <HStack spacing={2} >
            {buttonNumber.map((elem, i) =>
                <Button key={i} >
                    <Text>
                        {elem}
                    </Text>
                </Button>)}
        </HStack>
    )
}

export default PaginatedButtons;