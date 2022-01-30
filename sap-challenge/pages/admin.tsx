import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { deleteRequest, getRequest, getUser } from "../util/util";
import { useRouter } from "next/router";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { CasButton } from "../components/ui/CasButton";
import NavBar from "../components/NavBar";

const Admin: NextPage = () => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [schedules, setSchedule] = useState<any[]>([]);

	async function get() {
		const tempUser = await getUser();
		setUser(tempUser);
		if (tempUser == null || !tempUser) {
			router.push("/");
		} else if (!tempUser?.user.is_admin) {
			router.push("/orders");
		}

		const response = await getRequest("schedule");
		const json = await response.json();
		setSchedule(json);
		console.log(json);
	}

	async function deleteSchedule(id: number) {
		const response = await deleteRequest("schedule/" + id);
		await get();
	}

	useEffect(() => {
		get();
	}, []);

	return (
		<>
			<NavBar withShadow={true}></NavBar>
			<Stack padding="40" style={{ fontSize: "16pt" }}>
				<Heading as="h2" size="2xl" paddingBottom={30}>
					All Scheduled
				</Heading>
				<Box>
					<Stack
						direction={"row"}
						spacing={"24"}
						style={{ fontWeight: "bold", textTransform: "uppercase" }}
					>
						<Box>id</Box>
						<Box>parking name</Box>
						<Box>employee(s)</Box>
						<Box>Start time</Box>
						<Box>end time</Box>
					</Stack>
				</Box>
				{schedules.map &&
					schedules.map((e, i) => {
						const start = new Date(e.start_time);
						start.setMinutes(start.getMinutes() - 5);

						const end = new Date(e.end_time);
						end.setMinutes(end.getMinutes() + 5);
						return (
							<Box>
								<Stack direction={"row"} spacing={"24"}>
									<Box>{e.id}</Box>
									<Box>{e.pickup_location.name}</Box>
									<Box>{e.employees.map((e: any) => e.name).join(", ")}</Box>
									<Box>{start.toLocaleString()}</Box>
									<Box>{end.toLocaleString()}</Box>
									<Box>
										<CasButton onClick={() => deleteSchedule(e.id)}>
											delete
										</CasButton>
									</Box>
								</Stack>
							</Box>
						);
					})}
			</Stack>
		</>
	);
};

export default Admin;
