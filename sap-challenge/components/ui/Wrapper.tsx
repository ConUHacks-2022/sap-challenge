import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

interface WrapperProps extends BoxProps {
	variant?: "small" | "regular";
}

export const Wrapper: React.FC<WrapperProps> = ({
	children,
	variant = "regular",
	...props
}) => {
	return (
		<Box
			w="100%"
			mt={8}
			mx="auto"
			maxW={variant == "regular" ? "800px" : "400px"}
			{...props}
			minH="65%"
		>
			{children}
		</Box>
	);
};

export default Wrapper;
