import {
    Flex,
    Image,
    Text,
    Stack,
    HStack,
    Input,
    Button,
    Box
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <Flex bg="#000000"
            h="55vh"
            pt="1rem"
            color="white"
            fontSize=".9rem"
            justifyContent="center"
            gap="9rem">
            <Stack spacing={5}>
                <Stack spacing={-0.2}>
                    <Image src='https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png'
                        alt='logoHenry'
                        w="200px" />
                    <Text>The school that invests in you</Text>
                </Stack>
                <Stack spacing={2}>
                    <Stack spacing={-1}
                        fontWeight="bold">
                        <Text >
                            Queries to
                        </Text>
                        <Text color="#ffff01">
                            talent@soyhenry.com
                        </Text>
                    </Stack>
                    <Stack
                        fontWeight="bold">
                        <Text >
                            Subscribe to our newsletter
                        </Text>
                        <HStack>
                            <Input placeholder='Email'
                                bg="#ffffff"
                                borderRadius="5px" />
                            <Button bg="#ffff01">
                                <EmailIcon color="#000000" />
                            </Button>
                        </HStack>
                    </Stack>
                </Stack>
                <HStack>
                    <Button bg="#ffff01"
                        w="40px"
                        h="40px"
                        borderRadius="40px">
                    </Button>
                    <Button bg="#ffff01"
                        w="40px"
                        h="40px"
                        borderRadius="40px">
                    </Button>
                    <Button bg="#ffff01"
                        w="40px"
                        h="40px"
                        borderRadius="40px">
                    </Button>
                    <Button bg="#ffff01"
                        w="40px"
                        h="40px"
                        borderRadius="40px">
                    </Button>
                </HStack>
                <HStack>
                    <Text>Privacy Policy</Text>
                    <Box bg="#ffffff"
                        w=".1rem"
                        h="1rem" />
                    <Text>Terms & Conditions </Text>
                </HStack>
            </Stack>
            <Stack align="center"
                gap="3rem">
                <HStack fontWeight="bold"
                    align={"flex-start"}
                    spacing={55}
                    fontSize={"1.2rem"}>
                    <Stack >
                        <Text color={"#ffff01"}>
                            Study at Henry
                        </Text>
                        <Stack >
                            <Text>
                                Full Stack <br />
                                Admissions<br />
                                Reviews<br />
                                FAQs
                            </Text>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Text color={"#ffff01"}>
                            About Henry
                        </Text>
                        <Stack >
                            <Text>
                                About us <br />
                                Press<br />
                                Blog<br />
                                Wall of love<br />
                                Work with us
                            </Text>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Text color={"#ffff01"}>
                            Companies
                        </Text>
                        <Stack >
                            <Text>
                                Hire our talent
                            </Text>
                        </Stack>
                    </Stack>
                </HStack>
                <HStack>
                    <Text>
                        Made with 💛 by Henry alumni.<br />
                        Henry © 2022 | All rights reserved
                    </Text>
                </HStack>
            </Stack>
        </Flex>
    )
}

export default Footer;