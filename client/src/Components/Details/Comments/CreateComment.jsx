import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
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
    useToast
} from '@chakra-ui/react'


const CreateComment = ({ isOpen, onClose, type, id }) => {

    const { user } = useAuth();
    let token = user.accessToken;
    const idParam = useParams().id
    const navigate = useNavigate()
    const toast = useToast()

    const [comment, setComment] = useState("")
    const [enableSubmitButton, setEnableSubmitButton] = useState(true)

    useEffect(() => {

        (comment.length > 15) ? setEnableSubmitButton(false) : setEnableSubmitButton(true)

    }, [comment])

    const sendComment = async (e) => {

        try {

            const res = await axios.post(API_URL + `/comment`, { body: comment, [`${type}_id`]: id }, { headers: { Authorization: "Bearer " + token } })

            toast({
                title: `Comentario agregado`,
                status: "success",
                duration: 2000,
                isClosable: true,
            })

            onClose()

            setTimeout(() => { navigate(0) }, 2500)

        } catch (error) {

            toast({
                title: `No se pudo agregar el comentario, inténtelo nuevamente.`,
                status: "error",
                duration: 2000,
                isClosable: true,
            })

            onClose()
            setComment("")

        }

    }

    return (
        <Modal blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
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
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CreateComment