import React from 'react';
import { Center, Square } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { IUser } from '../interfaces/user';
import { Orders } from './orders';

interface IProps {
    currentUser: IUser,
}

export const Welcome = (props: IProps) => {
    return (
        <>
            <Center><Heading>Welcome, {props.currentUser.name}!</Heading>
            </Center>

            {/* Orders  */}
            <Orders orderUser={props.currentUser}></Orders>
        </>
    )
}