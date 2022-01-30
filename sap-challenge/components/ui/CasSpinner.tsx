import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

export default function CasSpinner({
	size = "xl",
}: {
	size: "xs" | "sm" | "md" | "lg" | "xl";
}) {
	return (
		<Box left="50%" position="absolute">
			<Spinner size="xl" />
		</Box>
	);
}
