import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Img,
  HStack,
  VStack,
  Text
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import QuestionModal from '../Modals/QuestionModal';
import { Link as RouteLink } from 'react-router-dom';
import { useAuth } from '../AuthComponents/AuthContext';

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { signout } = useAuth()

  const logout = async() => {
    await signout()
  }

  return (
    <>
      <Box bg={useColorModeValue('black', 'black')} px={4}>
        <Flex h={"96px"} alignItems={'center'} justifyContent={'space-around'}>
          <RouteLink to={"/home"} >
          <Img h={"25px"} src='https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png' />
          </RouteLink>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7} margin={0}>
            <QuestionModal title={"Hacer pregunta"} />
             {/*  <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button> */}
            
                <Flex>

              <Menu>
                <MenuButton
                  transition="all 0.3s"
                  _focus={{ boxShadow: 'none' }}>
                  <Avatar
                    size={'md'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                </MenuButton>
                <MenuList
                    bg={useColorModeValue('white', 'gray.900')}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                  >
                    <br />
                    <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <Text>Username</Text>
                  </Center>
                    <RouteLink to={'/profile'}>
                      <MenuItem> Profile </MenuItem>
                    </RouteLink>
                    <MenuDivider />
                    <MenuItem onClick={logout} >Log out</MenuItem>
                  </MenuList>
              </Menu>
              </Flex>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}