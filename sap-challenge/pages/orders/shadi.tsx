import { useEffect } from "react";

export default function Hello() {
	async function getData() {
		const response = await fetch("api/hello");
		const data = await response.json();
		console.log(data);
	}

	useEffect(() => {
		getData();
	}, []);

	return <h1>Hi</h1>;
}
