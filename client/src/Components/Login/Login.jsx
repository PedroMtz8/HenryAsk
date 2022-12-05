import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <Flex className='App'
            position='relative'
            h='100vh'
            w='100%'
            bg='blackAlpha.100'
        >
            <Flex w='50%' bg={"#ffff01"} />
            <Flex w='50%'>
                <Stack w={"40rem"} spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>
                            Inicia sesión en Henry Ask
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            Y descubri todo lo que ofrece nuestro sitio ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={4}>
                                <FormControl id="email">
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" />
                                </FormControl>
                                <FormControl id="password">
                                    <FormLabel>Contraseña</FormLabel>
                                    <Input type="password" />
                                </FormControl>
                                <Stack spacing={10}>
                                    <Stack
                                        direction={{ base: 'column', sm: 'row' }}
                                        align={'start'}
                                        justify={'space-between'}>
                                        <Checkbox>Recordar</Checkbox>
                                        <Link color={'blue.400'}>Olvidaste la contraseña?</Link>
                                    </Stack>
                                    <Button type='submit'
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Acceder
                                    </Button>
                                    <Stack align={'center'}>
                                        <Text>
                                            ¿Todavia no tenes una cuenta?
                                        </Text>
                                        <Link color={'blue.400'}
                                            onClick={() => navigate("/signup")}>
                                            Registrate
                                        </Link>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Flex>
        </Flex>
    )
}

export default Login