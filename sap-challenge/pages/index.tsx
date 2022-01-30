import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { Welcome } from "../components/welcome";
import { getUser } from "../util/util";
import { Login } from "../components/login";
import { useRouter } from "next/router";

// @TODO get the current logged in user

// @TODO make global var for http addresses
const Home: NextPage = () => {
	const router = useRouter();
	const [user, setUser] = useState(null);

	async function get() {
		setUser(await getUser());
		console.log(user);

		if (user == null || !user) {
			router.push("/login");
		} else {
			router.push("/orders");
		}
	}

	useEffect(() => {
		get();
	}, []);

	return <></>;
};

export default Home;
