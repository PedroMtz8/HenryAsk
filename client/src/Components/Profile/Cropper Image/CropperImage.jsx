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
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import getCroppedImg from "./getCroppedImg";
import Cropper from "react-easy-crop";
import { useEffect } from "react";

const CropperImage = ({ photoURL, setOpenCrop, setPhotoURL, croppedAreaPixels, setCroppedAreaPixels, setSubmitImage}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const userData = useSelector((state) => state.user.user);


  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      //La url es para el preview de la imagen y el file es el archivo
      const { url } = await getCroppedImg(photoURL, croppedAreaPixels);
      await setPhotoURL(url);
      setZoom(1);
    } catch (error) {
      console.log(error);
    }
  };

  const submitPhoto = async () => {
    setOpenCrop(false)
    setSubmitImage(true)
  };

  useEffect(() => {
    setSubmitImage(false)
  }, [])

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
            <Button bgColor={"tomato"} onClick={() => {
              setPhotoURL(userData?.avatar)
              setOpenCrop(false)
              }}>
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
