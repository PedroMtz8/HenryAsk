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

const CreateComment = ({ isOpen, onClose, id }) => {

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

            const res = await axios.put(API_URL + `/comment`, { body: comment, comment_id: id }, { headers: { Authorization: "Bearer " + token } })
            
            toast({
                title: `Comentario modificado correctamente.`,
                status: "success",
                duration: 2000,
                isClosable: true,
            })

            onClose()
            
            setTimeout(() => {navigate(0)}, 2500) 

        } catch (error) {

            toast({
                title: `El comentario no pudo ser modificado, intentelo de nuevo.`,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
            onClose()
            setComment("")

        }

    }

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modificar comentario</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input value={comment}
                        onKeyDown={e => (e.key === "Enter") ? (enableSubmitButton ? null : sendComment()) : null}
                        onChange={e => setComment(e.target.value)} />
                    {enableSubmitButton ? <Text color="red">El comentario debe tener al menos 15 caracteres</Text> : ""}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue'
                        mr={3}
                        disabled={enableSubmitButton}
                        onClick={sendComment}>
                        Confirmar
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