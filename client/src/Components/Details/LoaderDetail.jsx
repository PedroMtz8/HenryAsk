import React from 'react'
import { Flex, Skeleton, Text, Spinner } from '@chakra-ui/react'

function LoaderDetail() {
  return (
    <Flex flexDirection={'column'} w={'92%'} gap='1rem' pos={'relative'}>
        <Flex position={'relative'} w={'100%'} h='300px' mt='3rem' justifyContent={'center'} alignItems='center'>
        <Skeleton position='absolute' startColor='gray' endColor='#FFFFFF' w={'100%'} h='300px' borderRadius={'0.375rem'}>
        </Skeleton>
        <Spinner thickness='0.8rem'
                    speed='0.65s'
                    color='#FFFF01'
                    w="10rem"
                    h="10rem"></Spinner>
        </Flex>
        <Skeleton startColor='gray' endColor='#FFFFFF' w={'100%'} h='40px'/>
        <Flex flexDirection={'column'} gap='1rem' mb={'20px'}>
        <Skeleton startColor='gray' endColor='#FFFFFF' w={'100%'} h='250px' borderRadius={'0.375rem'}/>
        <Skeleton startColor='gray' endColor='#FFFFFF' w={'100%'} h='250px' borderRadius={'0.375rem'}/>
        <Skeleton startColor='gray' endColor='#FFFFFF' w={'100%'} h='250px' borderRadius={'0.375rem'}/>
        <Skeleton startColor='gray' endColor='#FFFFFF' w={'100%'} h='250px' borderRadius={'0.375rem'}/>
        <Skeleton startColor='gray' endColor='#FFFFFF' w={'100%'} h='250px' borderRadius={'0.375rem'}/>
        </Flex>
    
    </Flex>
  )
}

export default LoaderDetail