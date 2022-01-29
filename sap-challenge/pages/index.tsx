import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Landing } from '../components/landing'
import { Welcome } from '../components/welcome'
import { IUser } from '../interfaces/user'

// @TODO get the current logged in user
const user: IUser = {
	name: "John Doe",
}; // display welcome <username>

// const user = null; // display landing

const Home: NextPage = () => {
	return (
		<>
			{user? 
				<Welcome  currentUser={user}></Welcome> 
				: <Landing></Landing>
			}
		</>
	);
};

export default Home;
