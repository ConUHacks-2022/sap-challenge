import React from 'react';
import { Center, Square, Box, Heading, Container, Input, FormControl, Button } from '@chakra-ui/react'
import { IUser } from '../interfaces/user';
import darkBlue from '../theme';

const displayModal = false;
const EnterEmail = () => {
    return (
        <>
            <Box
               bg='tomato' w='100%' p={4} color='white'
            > Enter your email here
                <form onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Submit success! Show modal dialog box");

                }}>
                    <Input bg='white' color='darkblue'></Input>
                    {/* <Button type='submit' color='black'>Send Access Code</Button> */}
                </form>
                
            </Box>
        </>
    )
}

export const Landing = () => {
    return (
        <>
        <Center>
            <Container background='cyan'> 
                <Heading>This is the Landing Page</Heading>
                <EnterEmail></EnterEmail>
            </Container>
        </Center>
            
        </>
    )
}