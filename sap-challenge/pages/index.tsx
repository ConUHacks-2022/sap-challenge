import type { NextPage } from "next";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Landing } from '../components/landing';
import { Welcome } from '../components/welcome';
import { IUser } from '../interfaces/user';
import { urls } from './config'
import { Orders } from '../components/orders'

// @TODO get the current logged in user


// @TODO make global var for http addresses



const Home: NextPage = () => {
	const [user, setUser] = useState({
		id: 0,
		email: "",
		name: "",
		address: "",
		phone: "",
		is_admin: false,
	});
	// Temporary solution as cookies don't work
	useEffect(() => {
		
			axios.post(urls.verify_code, {
				"code": "000000",
				"email": "abbigail.kautzer.764458@test.com"
			}, { withCredentials: true })
				.then(res => {
					console.log("POST");
					console.log("Printing POST res: " + JSON.stringify(res.data));
					setUser(res.data.user);
					localStorage.setItem('storedUser', res.data.user);

				})
	}, [])

	// useEffect(() => {
	// 	axios.get('http://shadijiha.ddns.net/sap-challenge/auth/me', {withCredentials: true}) // display welcome <username>
	// 		.then(res => {
	// 			console.log(res.data);
	// 		})
	// 		.catch(e => {
	// 			console.log("Error when loading the current user logged in");
	// 		});
	// }, [])




	return (
		<>
			{user.id != undefined ?
				<Welcome currentUser={user}></Welcome>
				: <Landing></Landing>
			}

			

		</>
	);
};

export default Home;
