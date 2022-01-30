import Link, { LinkProps } from "next/link";
import React, { PropsWithChildren as Props } from "react";
import {
	Link as ChakraLink,
	LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

interface ICasLink extends ChakraLinkProps {
	href?: string; // TODO this is not ideal
}

export function CasLink({ href, ...props }: Props<ICasLink>) {
	return (
		<Link href={href as any}>
			<ChakraLink color="dark" {...props}>
				{props.children}
			</ChakraLink>
		</Link>
	);
}
