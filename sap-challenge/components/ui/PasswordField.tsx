import {
	InputGroup,
	Input,
	InputRightElement,
	Button,
	FormLabel,
	FormControl,
	FormErrorMessage,
	Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { capitalizeFirstLetter, InputFieldProps } from "./InputField";
import { useField } from "formik";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function PasswordField({ label, size, ...props }: InputFieldProps) {
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);

	const [field, { error }] = useField(props);
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>
				{label ? label : capitalizeFirstLetter(field.name)}
			</FormLabel>
			<InputGroup size="md">
				<Input
					type={show ? "text" : "password"}
					{...field}
					{...props}
					id={field.name}
					placeholder={props.placeholder ?? label ?? field.name}
				/>
				<InputRightElement width="4.5rem">
					<Button h="1.75rem" size="sm" onClick={handleClick}>
						{/* {show ? "Hide" : "Show"} */}
						<Tooltip label={show ? "Hide" : "Show"} placement="bottom">
							{show ? <ViewOffIcon /> : <ViewIcon />}
						</Tooltip>
					</Button>
				</InputRightElement>
			</InputGroup>
			{!!error && <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	);
}
export default PasswordField;
