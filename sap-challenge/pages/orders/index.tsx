import { Heading, Stack, Box, Alert, AlertIcon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MyCard } from "../../components/Card";
import NavBar from "../../components/NavBar";
import { IOrder } from "../../interfaces/order";
import { IUser } from "../../interfaces/user";
import { getRequest, getUser } from "../../util/util";

export default function Orders() {
	const router = useRouter();
	const [orders, setOrders] = useState<IOrder[]>([]);
	const [alertData, setAlertData] =
		useState<{ show: boolean; status: "error" | "success"; message: string }>();

	async function fetchData() {
		const user = await getUser();

		if (!user) {
			router.push("/login");
		}

		const res = await getRequest("orders/all");
		const json = await res.json();
		setOrders(json);
		console.log(json);
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<NavBar withShadow={true}></NavBar>
			<Box padding="40">
				<Stack>
					{alertData?.show && (
						<Box paddingBottom={5}>
							<Alert status="success">
								<AlertIcon />
								Data uploaded to the server. Fire on!
							</Alert>
						</Box>
					)}
					<Heading as="h2" size="2xl">
						UnScheduled orders
					</Heading>
					<Stack direction="row" paddingBottom="20" paddingTop="10">
						{orders
							.filter((e) => !e.schedule)
							.map((e, i) => (
								<MyCard
									key={i}
									order={e}
									alertMutator={setAlertData}
									dataFetcher={fetchData}
								></MyCard>
							))}
					</Stack>
					<Heading as="h2" size="2xl">
						Scheduled orders
					</Heading>
					<Stack direction="row" paddingBottom="20" paddingTop="10">
						{orders
							.filter((e) => e.schedule)
							.map((e, i) => (
								<MyCard
									key={i}
									order={e}
									alertMutator={setAlertData}
									dataFetcher={fetchData}
								></MyCard>
							))}
					</Stack>
				</Stack>
			</Box>
		</>
	);
}
