import { useState } from 'react'
import {
    VStack,
    HStack,
    FormControl,
    Input,
    Select,
    Stack,
    Link,
    Button,
    Heading,
    SimpleGrid,
    Flex,
    Text,
    Image,
    InputGroup,
    InputRightElement,
    Checkbox
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../AuthComponents/AuthContext"

const FormLogin = () => {

    const navigate = useNavigate()
    const { login } = useAuth()

    const [infoUser, setInfoUser] = useState({
        email: "",
        password: ""
    });

    const [errorInfoUser, setErrorInfoUser] = useState({
        email: "black",
        password: {
            complete: "black",
            capitalLetter: false,
            digit: false,
            specialCharacter: false,
            eightCharacters: false
        }
    })

    const onChangeInput = (e) => {
        setInfoUser({
            ...infoUser,
            [e.target.name]: e.target.value
        })
    }

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const submitHandler = async (e) => {
        e.preventDefault()
        await login(infoUser.email, infoUser.password)
        navigate("/")
    }

    return (
        <VStack spacing={6}>
            <VStack spacing={4}
                align="left"
                alignSelf="flex-start">
                <Image src='https://assets.soyhenry.com/henry-landing/assets/Henry/logo.png'
                    alt='logoHenry'
                    w="9rem" />
                <Heading fontSize='3xl'>
                    Resuelve tus <Text display={"inline"} boxShadow='0px 7px 0px 0px #ffff01'>dudas</Text> 🚀
                </Heading>
                <Text fontSize='1rem'
                    color='gray.600'>
                    Regístrate para ingresar a nuestra plataforma
                </Text>
            </VStack>
            <form onSubmit={submitHandler}>
                <Stack spacing={3} w="23rem" >
                    <FormControl id="email"
                        fontSize=".8rem">
                        <Input name='email'
                            placeholder='Email'
                            type="email"
                            borderColor={errorInfoUser.email}
                            focusBorderColor='black'
                            _hover={{ borderColor: errorInfoUser.email }}
                            value={infoUser.email}
                            onChange={onChangeInput} />
                        <Flex justifyContent="flex-end">
                            {(errorInfoUser.email === "red") && <Text color="red">* Email no válido</Text>}
                        </Flex>
                    </FormControl>
                    <FormControl id="password">
                        <InputGroup size='md'>
                            <Input name='password'
                                placeholder='Contraseña'
                                type={show ? 'text' : 'password'}
                                borderColor={errorInfoUser.password.complete}
                                focusBorderColor='black'
                                _hover={{ borderColor: errorInfoUser.password.complete }}
                                value={infoUser.password}
                                onChange={onChangeInput} />
                            <InputRightElement width='3rem'>
                                {show ? <ViewIcon fontSize={"1.5rem"} onClick={handleClick} /> : <ViewOffIcon fontSize={"1.5rem"} onClick={handleClick} />}
                            </InputRightElement>
                        </InputGroup>
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
                            }}
                        >
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
        </VStack>
    )
}

export default FormLogin; 