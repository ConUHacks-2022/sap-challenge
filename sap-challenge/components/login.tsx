import {
	Button,
	WrapItemProps,
	Box,
	Stack,
	FormErrorMessage,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";
import { apiUrl, getUser, postRequest, toFormikErrors } from "../util/util";
import { CasButton } from "./ui/CasButton";
import InputField from "./ui/InputField";
import Wrapper from "./ui/Wrapper";

interface LoginFormFields {
	email: string;
}

export function Login() {
	const router = useRouter();
	const [errors, setErrors] = useState<string[]>([]);
	const email = useFormInput();
	const code = useFormInput();
	const [codeView, setCodeView] = useState<"code" | "email">("email");

	async function submitForm(e: any) {
		e.preventDefault();

		if (codeView == "email") {
			const response = await postRequest("auth/sendCode", {
				email: email.value,
			});
			const json = await response.json();

			if (json.status == "SUCCESS") {
				setCodeView("code");
			} else {
				setErrors(json.errors);
				console.log(json);
			}
		} else {
			const response = await postRequest("auth/verifyCode", {
				code: code.value,
				email: email.value,
			});
			setErrors([]);
			const json = await response.json();

			if (json.status == "SUCCESS") {
				if (json.user.is_admin) {
					router.push("/admin");
				} else {
					router.push("/orders");
				}
			} else {
				setErrors(json.errors);
			}
		}
	}

	return (
		<>
			<Wrapper variant="small" mt={16}>
				<form onSubmit={submitForm}>
					<Stack spacing={6} direction="column">
						{codeView == "email" ? (
							<InputField
								name="email"
								label="Email"
								placeholder="Email..."
								{...email}
							/>
						) : (
							<InputField
								name="code"
								label="code"
								placeholder="Enter the 6 digits code..."
								{...code}
							/>
						)}

						{errors?.length > 0 ? (
							<span style={{ color: "red" }}>{errors[0]}</span>
						) : null}
						<CasButton type="submit" size="lg">
							Login
						</CasButton>
					</Stack>
				</form>
			</Wrapper>
		</>
	);
}

export function useFormInput(initialValue: string = "") {
	const [value, setValue] = useState(initialValue);

	function handleChange(e: any) {
		setValue(e.target.value);
	}

	return {
		value,
		onChange: handleChange,
	};
}
