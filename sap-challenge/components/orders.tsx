import React from 'react'
import { Box, Center, Heading } from '@chakra-ui/react'
import { Card, Icon } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { urls } from '../pages/config'
import { IOrder } from '../interfaces/order'

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react'
import { IUser } from '../interfaces/user'
import { spawn } from 'child_process'

export enum statusOptions {
    unscheduled,
    scheduled,
    received
}

const readStatus = (statusOpt: statusOptions) => {
    if (statusOpt == statusOptions.unscheduled)
        return "unscheduled";
    if (statusOpt == statusOptions.scheduled)
        return "scheduled";
    if (statusOpt == statusOptions.received)
        return "received";
}

interface IProps {
    orderUser: IUser,
}

const orderMapper = (myOrders: IOrder[]) => {
    myOrders.map(oneOrder => {
        return (<>
            <Tr>
                <Td>Jan {Math.floor(Math.random() * 31)}th, 20{Math.floor(Math.random() * 22)}</Td>
                <Td>{oneOrder.sap_id}</Td>
                <Td>
                    {readStatus(oneOrder.status)}
                </Td>
            </Tr>
        </>)
    })
}

/* ************* / 
    Dummy data
 * ************* */

const mockOrders: IOrder[] = [
    {
        sap_id: 1,
        preparation_time: "20",
        parcel_size: "m",
        entries: "hello",
        schedule: true,
        status: statusOptions.received,
    },
    {
        sap_id: 2,
        preparation_time: "40",
        parcel_size: "m",
        entries: "entries",
        schedule: false,
        status: statusOptions.unscheduled,
    },
    {
        sap_id: 3,
        preparation_time: "30",
        parcel_size: "m",
        entries: "hi",
        schedule: false,
        status: statusOptions.scheduled,
    },
];


export const Orders = (props: IProps) => {
    const [orders, setOrders] = useState<IOrder[]>(
        [
            {
                sap_id: 0,
                preparation_time: "",
                parcel_size: "",
                entries: "",
                schedule: false,
            } as IOrder
        ]
    );


    // call API to orders of user
    useEffect(() => {
        axios.get(urls.orders_user, { withCredentials: true })
            .then(res => {
                console.log(JSON.stringify(res.data))
                setOrders([]);
                const data = res.data;
                // mapping the backend order into the fronend order
                const newArr = res.data.map((fetchedOrder: IOrder) => {
                    return {
                        sap_id: fetchedOrder.sap_id,
                        preparation_time: fetchedOrder.preparation_time,
                        parcel_size: fetchedOrder.parcel_size,
                        entries: fetchedOrder.entries,
                        schedule: (fetchedOrder.schedule) ? true : false,

                    }
                })
                setOrders(newArr);


            })
            .catch(e => {
                console.log("Error: cannot fetch orders of user. Will be using mock data.");
            })
            .finally(() => {
                console.log('Finally')
                setOrders([]);
                setOrders(mockOrders); // doesn't work

            })
    }, [])


    return (
        <>
            <Center>
                <Card>
                    <Card.Content>
                        <Center><Card.Header>
                            <Heading>View Orders</Heading>
                        </Card.Header></Center>
                    </Card.Content>
                    <Card.Content>
                        <Table size='sm'>
                            <Thead>
                                <Tr>
                                    <Th>Date of Order</Th>
                                    <Th>Order ID</Th>
                                    <Th>Status</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    mockOrders.map(oneOrder => {
                                        return (<>
                                            <Tr>
                                                <Td>Jan {Math.floor(Math.random() * 31)}th, 20{Math.floor(Math.random() * 22)}</Td>
                                                <Td>{oneOrder.sap_id}</Td>
                                                <Td>
                                                    {readStatus(oneOrder.status)}
                                                </Td>
                                            </Tr>
                                        </>)
                                    })
                                }
                                <Tr>
                                    <Td>Jan 22th, 2022</Td>
                                    <Td>3513</Td>
                                    <Td>
                                        {readStatus(statusOptions.received)}
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </Card.Content>
                </Card>
            </Center>


        </>
    )
}
