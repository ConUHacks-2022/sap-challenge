import React from 'react';
import { Center, Square, Box, Heading, Container } from '@chakra-ui/react'
import { IUser } from '../interfaces/user';


const EnterEmail = () => 
{
    return (
    <>
        <Box
            bg='tomato' w='100%' p={4} color='white'
        >
            Enter your email here
        </Box>
    </>
    )
}

export const Landing = () =>
{
    return (
    <>
        <Container>
            <Heading>This is the Landing Page</Heading>
            <EnterEmail></EnterEmail>
        </Container> 
    </>
    )
}