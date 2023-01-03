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
    Text
} from '@chakra-ui/react'

const CreateComment = ({ isOpen, onClose, type, id }) => {

    const { user } = useAuth();
    let token = user.accessToken;
    const idParam = useParams().id
    const navigate = useNavigate()

    const [comment, setComment] = useState("")
    const [enableSubmitButton, setEnableSubmitButton] = useState(true)

    useEffect(() => {

        (comment.length > 15) ? setEnableSubmitButton(false) : setEnableSubmitButton(true)

    }, [comment])

    const sendComment = async (e) => {

        try {

            await axios.post(API_URL + `/comment`, { body: comment, [`${type}_id`]: id }, { headers: { Authorization: "Bearer " + token } })
            
            onClose()
            
            setTimeout(() => {navigate(0)}, 500) 

        } catch (error) {

            console.log(error)

        }

    }

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Comentar {type === "post" ? "pregunta" : "respuesta"}</ModalHeader>
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