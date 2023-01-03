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
    useToast,
    Center,
    Box
} from '@chakra-ui/react'
import { CheckCircleIcon, InfoIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from "../../AuthComponents/AuthContext"

const paises = ['Argentina', 'Brasil', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica', 'Ecuador', 'El Salvador', 'España', 'Estados Unidos', 'Guatemala', 'Guinea Ecuatorial', 'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'Puerto Rico', 'República Dominicana', 'Uruguay', 'Venezuela', 'OTROS']

const FormRegister = () => {

    const navigate = useNavigate()
    const toast = useToast()
    const { signup, signout, updateUsername, user } = useAuth()
    const [emailError, setEmailError] = useState(false)

    const [infoUser, setInfoUser] = useState({
        userSlack: "",
        country: "",
        email: "",
        password: ""
    });

    const [errorInfoUser, setErrorInfoUser] = useState({
        userSlack: "black",
        country: "black",
        email: "black",
        password: {
            complete: "black",
            capitalLetter: "gray",
            digit: "gray",
            specialCharacter: "gray",
            eightCharacters: "gray"
        }
    })

    const [showSubmitButton, setShowSubmitButton] = useState(true)


    useEffect(() => {
        setShowSubmitButton(!(
            (errorInfoUser.userSlack === "green")
            &&
            (errorInfoUser.country === "green")
            &&
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
                    capitalLetter: /[A-Z]/.test(e.target.value) ? "green" : "red",
                    digit: /[0-9]/.test(e.target.value) ? "green" : "red",
                    specialCharacter: /[$@$!%*?&#+-.]/.test(e.target.value) ? "green" : "red",
                    eightCharacters: e.target.value.length > 8 ? "green" : "red"
                }
            })
        }
        else {
            setErrorInfoUser({
                ...errorInfoUser, [e.target.name]: (e.target.value === "") ? "red" : "green"
            })
        }
    }

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            let res = await signup(infoUser.email, infoUser.password, infoUser.userSlack, infoUser.country)
            await updateUsername(res.user, infoUser.userSlack)
            console.log("Logeo", res)
            toast({
                title: "Registro exitoso",
                description: "Tendrás que esperar a que tu cuenta sea aprobada para poder ingresar, se te notificará por mail",
                status: "success",
                duration: 6000,
                isClosable: true,
                position: "top"
            })
            await signout()
            navigate("/login")

        }
        catch (error) {
            if (error) setEmailError(true) /* toast({
                description: "Email already in use",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            }) */
            else setEmailError(false)

            if (error.message.includes("Password")) {
                toast({
                    description: "You should add at least 8 characters",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                })
            }
        }
    }

    return (
        <VStack >
            <VStack spacing={{ base: 3, lg: 4 }}
                align="left"
                alignSelf="flex-start">
                <Image src='https://assets.soyhenry.com/henry-landing/assets/Henry/logo.png'
                    alt='logoHenry'
                    w="9rem" />
                <Heading fontSize={{ base: '1rem', lg: '1.3rem' }}>
                    Resuelve tus <Text display={"inline"} boxShadow='0px 7px 0px 0px #ffff01'>dudas</Text> 🚀
                </Heading>
                <Text fontSize={{ base: '0.9rem', lg: '1rem' }}
                    color='gray.600'>
                    Regístrate para ingresar a nuestra plataforma
                </Text>
            </VStack>
            <form onSubmit={submitHandler}>
                <Stack spacing={{ base: 2, lg: 3 }}
                    w={{ base: '19rem', sm: '23rem' }}
                    fontSize={{ base: '.75rem', lg: '.8rem' }} >
                    <FormControl id="userSlack"
                        w={{ base: '19rem', sm: '23rem' }}>
                        <Input fontSize={{ base: '.8rem', lg: '1rem' }}
                            name='userSlack'
                            placeholder='Usuario de Slack con tu cohorte'
                            borderColor={errorInfoUser.userSlack}
                            focusBorderColor='black'
                            _hover={{ borderColor: errorInfoUser.userSlack }}
                            value={infoUser.userSlack}
                            onChange={onChangeInput}
                            onBlur={(e) => setErrorInfoUser({
                                ...errorInfoUser, [e.target.name]: (e.target.value === "") ? "red" : "green"
                            })}
                        />
                        <Flex justifyContent={"flex-end"}>
                            {(errorInfoUser.userSlack === "red") && <Text color="red"  >* Campo obligatorio</Text>}
                        </Flex>
                    </FormControl>
                    <FormControl id="country"
                        w={{ base: '19rem', sm: '23rem' }}>
                        <Select fontSize={{ base: '.8rem', lg: '1rem' }}
                            color="gray"
                            name="country"
                            placeholder='Selecciona tu país de residencia'
                            borderColor={errorInfoUser.country}
                            focusBorderColor='black'
                            _hover={{ borderColor: errorInfoUser.country }}
                            value={infoUser.country}
                            onChange={onChangeInput}
                        >
                            {paises.map((elem, i) => <option key={i} value={elem}>{elem}</option>)}
                        </Select>
                        <Flex justifyContent="flex-end">
                            {(errorInfoUser.country === "red") && <Text color="red">* Selecciona un país</Text>}
                        </Flex>
                    </FormControl>
                    <FormControl id="email"
                        w={{ base: '19rem', sm: '23rem' }}>
                        <Input fontSize={{ base: '.8rem', lg: '1rem' }}
                            name='email'
                            placeholder='Email'
                            type="email"
                            borderColor={errorInfoUser.email}
                            focusBorderColor='black'
                            autoComplete="true"
                            _hover={{ borderColor: errorInfoUser.email }}
                            value={infoUser.email}
                            onChange={onChangeInput} />
                        <Flex justifyContent="flex-end">
                            {(errorInfoUser.email === "red") && <Text color="red">* Email no válido</Text>}
                        </Flex>
                    </FormControl>
                    <FormControl id="password"
                        w={{ base: '19rem', sm: '23rem' }}>
                        <InputGroup size='md'>
                            <Input fontSize={{ base: '.8rem', lg: '1rem' }}
                                name='password'
                                placeholder='Contraseña'
                                type={show ? 'text' : 'password'}
                                borderColor={errorInfoUser.password.complete}
                                focusBorderColor='black'
                                autoComplete="false"
                                _hover={{ borderColor: errorInfoUser.password.complete }}
                                value={infoUser.password}
                                onChange={onChangeInput} />
                            <InputRightElement width='3rem'>
                                {show ? <ViewIcon fontSize={"1.5rem"} onClick={handleClick} /> : <ViewOffIcon fontSize={"1.5rem"} onClick={handleClick} />}
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    {showPasswordErrorText(errorInfoUser.password)}

                    <Stack spacing={{ base: 3, lg: 4 }}
                        w={{ base: '19rem', sm: '23rem' }} >
                        <Button alignSelf={"center"}
                            bg='#ffff01'
                            type='submit'
                            color='black'
                            fontSize={{ base: '.8rem', lg: '1rem' }}
                            disabled={showSubmitButton}
                            w={{ base: '100%', lg: '23rem' }}
                        >
                            Registrame
                        </Button>

                        {
                            emailError ?
                                <Center>
                                    <Box border={"2px solid red"} color={"red"} w={"90%"} borderRadius={"5px"} p={"5px"} textAlign="center">
                                        <Text>Ya existe un usuario con ese email</Text>
                                    </Box>
                                </Center>
                                :
                                null
                        }

                        <HStack justifyContent={{ base: 'center', lg: 'flex-start' }}
                            gap={"0.2rem"}
                            fontSize={{ base: '.8rem', lg: '1rem' }}>
                            <Text>
                                ¿Ya tienes una cuenta?
                            </Text>
                            <Link as={"u"} fontWeight="semibold" textDecoration={"underline"}
                                onClick={() => navigate("/login")}>
                                Ingresa aquí.
                            </Link>
                        </HStack>
                    </Stack>
                </Stack>
            </form>
        </VStack>
    )
}

export default FormRegister;




const showPasswordErrorText = (colorError) => {

    return (
        <Flex justifyContent="center"
              alignItems="center"
              w={{ base: '19rem', sm: '23rem' }}>
            <SimpleGrid
                columns={2}
                spacing={3}
                fontSize={{ base: '.8rem', lg: '.9rem' }}>
                <Flex alignItems="center"
                    gap={".4rem"}
                    color={colorError.eightCharacters}>
                    {colorError.eightCharacters === "green" ? <CheckCircleIcon /> : <InfoIcon />}
                    Más de 8 caracteres
                </Flex>
                <Flex alignItems="center"
                    gap={".4rem"}
                    color={colorError.capitalLetter}>
                    {colorError.capitalLetter === "green" ? <CheckCircleIcon /> : <InfoIcon />}
                    Una mayúscula
                </Flex>
                <Flex alignItems="center"
                    gap={".4rem"}
                    color={colorError.specialCharacter}>
                    {colorError.specialCharacter === "green" ? <CheckCircleIcon /> : <InfoIcon />}
                    Un caracter especial
                </Flex>
                <Flex alignItems="center"
                    gap={".4rem"}
                    color={colorError.digit}>
                    {colorError.digit === "green" ? <CheckCircleIcon /> : <InfoIcon />}
                    Al menos un número
                </Flex>
            </SimpleGrid>
        </Flex>
    )
}