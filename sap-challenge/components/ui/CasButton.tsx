import { Button, ButtonProps, filter } from "@chakra-ui/react";
import React, { PropsWithChildren as Props } from "react";

interface ICasButtonProps extends ButtonProps {}

export function CasButton(props: Props<ICasButtonProps>) {
	const activeDisabledCSS = { backgroundColor: "dark" } as const;
	return (
		<Button
			{...props}
			background="#22223B"
			color="white"
			borderRadius="4"
			transition="all 0.5s"
			_hover={{ backgroundColor: "medium" }}
			_active={activeDisabledCSS}
			_disabled={activeDisabledCSS}
		>
			{props.children}
		</Button>
	);
}
