import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { useRouter } from "next/dist/client/router";
import { getUser } from "../util/util";
import {
	Link as ChakraLink,
	LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

interface INavBarProps {
	withShadow?: boolean;
}

function NavBar(props: INavBarProps) {
	const [user, setUser] = useState<any>(null);
	const router = useRouter();
	const navLinks = useRef<HTMLUListElement>(null);
	const nav = useRef<HTMLElement>(null);
	const [navClass, setNavClass] = useState("");

	useEffect(() => {
		getUser().then((e) => setUser(e.user));
	});

	// This is used to make the background changing effect when element has scrolled
	const listenScrollEvent = (event: any) => {
		if (window.scrollY > (nav.current?.clientHeight ?? 0)) {
			return setNavClass(styles.transparent_nav);
		} else {
			return setNavClass("");
		}
	};
	useEffect(() => {
		window.addEventListener("scroll", listenScrollEvent);

		return () => window.removeEventListener("scroll", listenScrollEvent);
	}, []);

	return (
		<nav
			id={styles.navbar}
			className={[navClass, props.withShadow ? styles.nav_shadow : ""].join(
				" "
			)}
			ref={nav}
		>
			<div className={styles.logo}>
				<h4>Scheduler</h4>
			</div>
			<ul className={styles.navlinks} ref={navLinks}>
				<li>
					<CasLink href="/products">{user ? "Hi, " + user.name : null}</CasLink>
				</li>
				<li>
					<CasLink href="/" onClick={(e: any) => router.push("/login")}>
						{user != null ? "Logout" : "Login"}
					</CasLink>
				</li>
			</ul>
		</nav>
	);
}

interface ICasLink extends ChakraLinkProps {
	href?: string; // TODO this is not ideal
}

function CasLink({ href, ...props }: any) {
	return (
		<Link href={href as any}>
			<ChakraLink color="dark" {...props}>
				{props.children}
			</ChakraLink>
		</Link>
	);
}

export default NavBar;
