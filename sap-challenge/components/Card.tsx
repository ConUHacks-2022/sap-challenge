import {
	Alert,
	AlertIcon,
	Badge,
	Box,
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Stack,
	useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IOrder } from "../interfaces/order";
import { getRequest, postRequest } from "../util/util";
import { CasButton } from "./ui/CasButton";

export function MyCard({
	order,
	alertMutator,
	dataFetcher,
}: {
	order: IOrder;
	alertMutator: any;
	dataFetcher: any;
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [stores, setStores] = useState<any[]>([]);
	const selectRef = useRef<HTMLSelectElement>(null);
	const pickupselectRef = useRef<HTMLSelectElement>(null);
	const date = useRef<HTMLInputElement>(null);
	const [locations, setLocations] = useState<any[]>([]);

	function openModal() {
		onOpen();
		getStores();
	}

	async function getStores() {
		const response = await getRequest("all");
		const json = await response.json();
		setStores(json);
	}

	async function fetchLocations() {
		if (date.current?.value && selectRef.current?.value) {
			const response = await postRequest("availablePickups", {
				order_id: order.id,
				store_id: selectRef.current?.value,
				desired_time: date.current?.value,
			});
			const json = await response.json();
			console.log(json);
			setLocations(json);
		}
	}

	async function schedule() {
		const response = await postRequest("book", {
			order_id: order.id,
			store_id: selectRef.current?.value,
			pickup_location_id: pickupselectRef.current?.value,
			desired_time: date.current?.value,
		});
		const json = await response.json();
		console.log(json);

		if (json.status == "SUCCESS") {
			alertMutator({ show: true, status: "success" });
			dataFetcher();
			onClose();

			setTimeout(() => {
				alertMutator({ show: false });
			}, 2000);
		} else {
			alertMutator({ show: true, status: "error", message: json.errors[0] });
		}
	}

	return (
		<>
			{" "}
			<Box
				maxW="sm"
				borderWidth="1px"
				borderRadius="lg"
				overflow="hidden"
				position="relative"
			>
				<Box p="6">
					<Box display="flex" alignItems="baseline">
						<Badge
							borderRadius="full"
							px="2"
							colorScheme={order.schedule ? "teal" : "red"}
						>
							{order.schedule ? "scheduled" : "Not scheduled"}
						</Badge>
						<Box
							color="gray.500"
							fontWeight="semibold"
							letterSpacing="wide"
							fontSize="xs"
							textTransform="uppercase"
							ml="2"
						>
							Parcel size {order.parcel_size}
						</Box>
					</Box>

					<Box
						mt="1"
						fontWeight="semibold"
						as="h4"
						lineHeight="tight"
						isTruncated
					>
						Order #{order.sap_id}
					</Box>

					<Box
						mt="1"
						fontWeight="semibold"
						as="h4"
						lineHeight="tight"
						isTruncated
					>
						Prep. time: {order.preparation_time} min
					</Box>

					<Box paddingBottom="5">
						{JSON.parse(order.entries).map((e: any, i: number) => {
							return (
								<Box key={i} paddingBottom={7}>
									{e.productName}
								</Box>
							);
						})}
					</Box>
					<Box position="absolute" bottom="2">
						{order.schedule == null ? (
							<CasButton onClick={openModal}>Schedule pick-up</CasButton>
						) : (
							new Date((order.schedule as any).start_time).toLocaleString()
						)}
					</Box>
				</Box>
			</Box>{" "}
			<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Schedule you order for pickup</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Stack spacing={10}>
							<Box>
								1. Select a store for pickup:
								<Select
									placeholder="Select store"
									size="lg"
									ref={selectRef}
									onChange={fetchLocations}
								>
									{stores.map((e, i) => (
										<option value={e.id} key={i}>
											{e.name} ({e.address})
										</option>
									))}
								</Select>
							</Box>
							<Box>
								2. Select a pickup time:
								<input
									type="datetime-local"
									ref={date}
									onChange={fetchLocations}
								/>
							</Box>
							<Box>
								3. Select a parking:
								<Select
									placeholder="Select store"
									size="lg"
									ref={pickupselectRef}
								>
									{locations.map &&
										locations.map((e, i) => (
											<option value={e.id} key={i}>
												{e.name} (Parcel size: {e.parcel_size} only)
											</option>
										))}
								</Select>
							</Box>
						</Stack>
					</ModalBody>

					<ModalFooter>
						<CasButton mr={3} onClick={schedule}>
							Schedule
						</CasButton>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
