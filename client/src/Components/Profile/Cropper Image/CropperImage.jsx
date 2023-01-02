import {
  Box,
  Text,
  Button,
  Center,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../slices/userSlice";
import { useAuth } from "../../AuthComponents/AuthContext";
import getCroppedImg from "./getCroppedImg";
import Cropper from "react-easy-crop";

const CropperImage = ({ photoURL, setOpenCrop, setPhotoURL, setProfilePic }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { user, uploadFile } = useAuth();
  const userData = useSelector((state) => state.user.user);
  const toast = useToast()


  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  async function handleSubmit(fileImg) {
    let res = await uploadFile(fileImg, user.uid, userData.userSlack);
    dispatch(updateUser(user.accessToken, res, userData.country));
    toast({
      description: "Imagen actualizada correctamente",
      duration: 3000,
      position: "top",
      status: "success",
      isClosable: true
    })
    setTimeout(() => {
      window.location.reload(false);
    }, 3000)
  }

  const cropImage = async () => {
    try {
      //La url es para el preview de la imagen y el file es el archivo
      const { url, file2 } = await getCroppedImg(photoURL, croppedAreaPixels);
      await setPhotoURL(url);
      setFile(file2);
      setZoom(1);
    } catch (error) {
      console.log(error);
    }
  };

  const submitPhoto = async () => {
    await handleSubmit(file);
  };

  return (
    <>
      <Center>
        <Box
          mt={"300px"}
          position={"absolute"}
          zIndex={5}
          w={{ base: "350px", sm: "500px", md: "500px", lg: "500px" }}
          h={"400px"}
          bgColor={"#333"}
        >
          <Box>
            <Cropper
              image={photoURL}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onZoomChange={setZoom}
              onCropChange={setCrop}
              onCropComplete={cropComplete}
            />
          </Box>
        </Box>
      </Center>
      <Center>
        <Box
          position={"absolute"}
          zIndex={10}
          top={350}
          bgColor={"#333"}
          p={"20px"}
          w={{ base: "350px", sm: "500px", md: "500px", lg: "500px" }}
        >
          <Box>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(e)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>

          <Flex mt={"10px"} justifyContent={"center"} gap={5}>
            <Button bgColor={"tomato"} onClick={() => setOpenCrop(false)}>
              Cancel
            </Button>
            <Button bgColor={"#FFFF01"} onClick={cropImage}>
              Crop
            </Button>
            <Button onClick={submitPhoto}>Submit</Button>
          </Flex>

          <Center>

          <Flex flexDirection={"column"} gap={1} m={"30px"} >
            <Text color={"white"} textAlign="center">Preview:</Text>
            <Box
              backgroundImage={photoURL}
              backgroundSize={"contain"}
              backgroundRepeat={"no-repeat"}
              backgroundPosition={"center"}
              w={"100px"}
              h={"100px"}
              borderRadius={"50%"}
              border={"1px solid black"}
              /* m={"50px"} */
            />
          </Flex>
              </Center>
        </Box>
      </Center>
    </>
  );
};

export default CropperImage;
