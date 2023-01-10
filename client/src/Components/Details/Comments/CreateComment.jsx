import { useState, useEffect } from 'react'
import axios from "axios";
import { useAuth } from "../../AuthComponents/AuthContext"
import API_URL from "../../../config/environment"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Text,
    useToast,
    Flex,
    Spinner
} from '@chakra-ui/react'


const CreateComment = ({ isOpen, onClose, type, id }) => {

    const { user } = useAuth();
    let token = user.accessToken;
    const toast = useToast()
    const [loading, setLoading] = useState(false)

    const [comment, setComment] = useState("")
    const [enableSubmitButton, setEnableSubmitButton] = useState(true)

    useEffect(() => {

        (comment.length > 15) ? setEnableSubmitButton(false) : setEnableSubmitButton(true)

    }, [comment])

    const sendComment = async (e) => {

        try {

            setLoading(true)
            await axios.post(API_URL + `/comment`, { body: comment, [`${type}_id`]: id }, { headers: { Authorization: "Bearer " + token } })

            toast({
                title: `Comentario agregado`,
                status: "success",
                duration: 2000,
                isClosable: true,
            })

            onClose()

            setTimeout(() => { window.location.reload(false) }, 2500)

        } catch (error) {

            toast({
                title: `No se pudo agregar el comentario, inténtelo nuevamente.`,
                status: "error",
                duration: 2000,
                isClosable: true,
            })

            onClose()
            setComment("")

        } finally{
            setLoading(false)
        }

    }

    return (
        <Modal blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={onClose}>
            <ModalOverlay />
            <ModalContent alignSelf={'center'}>
                <ModalHeader>Comentar {type === "post" ? "pregunta" : "respuesta"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input value={comment}
                        onKeyDown={e => (e.key === "Enter") ? (enableSubmitButton ? null : sendComment()) : null}
                        onChange={e => { (e.target.value.length > 600) ? null : setComment(e.target.value) }} />
                    {enableSubmitButton ? <Text color="red" py={".2rem"}>El comentario debe tener al menos 15 caracteres</Text> : ""}
                    {comment.length === 600 ? <Text py={".2rem"} color="orange.500">Límite de caracteres alcanzado {"(600)"}</Text> : ""}
                </ModalBody>
                <ModalFooter>
                    {
                        loading
                        ? <Flex justifyContent="flex-start" >
                            <Spinner
                                thickness='.7rem'
                                speed='0.7s'
                                emptyColor='gray.200'
                                color='#FFFF01'
                                w="5rem"
                                h="5rem"
                                mr='35px'
                            />
                          </Flex>
                      : <Flex>
                        <Button colorScheme='blue'
                            mr={3}
                            disabled={enableSubmitButton}
                            onClick={sendComment}>
                            Enviar
                        </Button>
                        <Button colorScheme='gray'
                            mr={3}
                            onClick={onClose}>
                            Cancelar
                        </Button>
                      </Flex>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CreateComment