import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthComponents/AuthContext';


export default function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const { forgotPasswordFunction } = useAuth()
    const toast = useToast()



    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await forgotPasswordFunction(email)
            toast({
                description: "Email sent, check your email",
                status: "success",
                duration: 4000,
                isClosable: true,
                position: "top"
            })
            navigate('/login')
        } catch (error) {
            toast({
                description: "Email not found",
                status: "error",
                duration: 4000,
                isClosable: true,
                position: "top"
            })
        }
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bgColor={"#1f1f1f"}
        >
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bgColor={"white"}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Olvidaste tu contraseña
                    <Text
                        as={'span'}
                        bgGradient="linear(to-r, red.400,pink.400)"
                        bgClip="text"
                    >
                        ?
                    </Text>
                </Heading>
                <Text
                    fontSize={{ base: 'sm', sm: 'md' }}
                    color={useColorModeValue('gray.800', 'gray.400')}>
                    Te enviaremos un email con un link para resetearla
                </Text>
                <FormControl id="email">
                    <Input
                        value={email}
                        name="email"
                        placeholder="ejemplo@email.com"
                        borderColor={"black"}
                        focusBorderColor='black'
                        bg={'white'}
                        onChange={(e) => setEmail(e.target.value)}
                        _placeholder={{ color: 'gray.500' }}
                        type="email"
                    />
                </FormControl>
                <Stack spacing={6}>
                    <Button
                        bgColor={"#ffff01"}
                        color={'black'}
                        border="none"
                        _hover={{
                            bg: 'blue.500',
                        }}
                        onClick={handleSubmit}
                    >
                        Request Reset
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}