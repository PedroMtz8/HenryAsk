import { useState, useEffect } from 'react'
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

    const [showSubmitButton, setShowSubmitButton] = useState(true)

    useEffect(() => {
        setShowSubmitButton(!(
            (errorInfoUser.email === "green")
            &&
            (errorInfoUser.password.complete === "green")))
    })

    const onChangeInput = (e) => {

        setInfoUser({ ...infoUser, [e.target.name]: e.target.value })

        if (e.target.name === "email") {
            setErrorInfoUser({
                ...errorInfoUser, email: !(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(e.target.value)) ? "red" : "green"
            })
        }
        else if (e.target.name === "password") {

            const current = e.target.value

            const complete = (/[A-Z]/.test(current)
                &&
                /[0-9]/.test(current)
                &&
                /[$@$!%*?&#+-.]/.test(current)
                &&
                (current.length > 8))
                ?
                "green"
                :
                "red"

            setErrorInfoUser({
                ...errorInfoUser, password: {
                    complete,
                    capitalLetter: /[A-Z]/.test(e.target.value),
                    digit: /[0-9]/.test(e.target.value),
                    specialCharacter: /[$@$!%*?&#+-.]/.test(e.target.value),
                    eightCharacters: (e.target.value.length > 8)
                }
            })
        }
    }

    const showPasswordErrorText = () => {

        if (errorInfoUser.password.complete === "red") {
            return (<Text color="red">{
                (infoUser.password === "") ? "* Campo obligatorio"
                    : !(errorInfoUser.password.eightCharacters) ? "* Al menos 8 caracteres"
                        : !(errorInfoUser.password.capitalLetter) ? "* Una mayuscula"
                            : !(errorInfoUser.password.specialCharacter) ? "* Un caracter especial"
                                : "* Un numero"
            }</Text>)
        }
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
                    ¡<Text display={"inline"} boxShadow='0px 7px 0px 0px #ffff01'>Hola</Text> de nuevo! 👋
                </Heading>
                <Text fontSize='1rem'
                    color='gray.600'>
                    Ingresa a Henry ASK y resuelve todas tus dudas
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
                            onChange={onChangeInput}
                        />
                        <Flex justifyContent="flex-end">
                            {(errorInfoUser.email === "red") &&
                                (<Text color="red">{(infoUser.email === "") ? "* Campo obligatorio" : `* Email no válido`}</Text>)}
                        </Flex>
                    </FormControl>
                    <FormControl id="password"
                        fontSize=".8rem">
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
                        <Flex justifyContent="flex-end">
                            {showPasswordErrorText()}
                        </Flex>
                    </FormControl>
                    <Stack spacing={5}>
                        <Stack fontSize=".9rem"
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'space-between'}>
                            <Checkbox>Recordarme</Checkbox>
                            <Link as={"u"} fontWeight="semibold" textDecoration={"underline"}>
                                Olvidé mi contraseña
                            </Link>
                        </Stack>
                        <Button type='submit'
                            bg='#ffff01'
                            color='black'
                            disabled={showSubmitButton}
                        >
                            Ingresar
                        </Button>
                        <HStack justifyContent="flex-start"
                            gap={"0.2rem"}
                            fontSize=".9rem">
                            <Text>
                            ¿Aún no tienes una cuenta?
                            </Text>
                            <Link as={"u"} fontWeight="semibold" textDecoration={"underline"}
                                onClick={() => navigate("/signup")}>
                                Regístrate aquí
                            </Link>
                        </HStack>
                    </Stack>
                </Stack>
            </form>
        </VStack>
    )
}

export default FormLogin; 