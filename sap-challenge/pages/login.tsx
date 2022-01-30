import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { Welcome } from "../components/welcome";
import { getUser } from "../util/util";
import { Login as LoginComponent } from "../components/login";
import { Box } from "@chakra-ui/react";
import img from "../assets/99173.jpg";

const Login: NextPage = () => {
	const [user, setUser] = useState(null);

	async function get() {
		setUser(await getUser());
		console.log(user);
	}

	useEffect(() => {
		get();
	}, []);

	return (
		<>
			{/* <Box
				backgroundImage={img.src}
				position="absolute"
				top={0}
				width={window.innerWidth}
				height={window.innerHeight}
				padding={0}
			></Box> */}
			<Box>
				<LoginComponent />
			</Box>
		</>
	);
};

export default Login;
