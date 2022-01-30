import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

export interface InputFieldProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	placeholder?: string;
	label?: string;
}

function InputField({ label, size, ...props }: InputFieldProps) {
	return (
		<FormControl>
			<FormLabel>{label}</FormLabel>
			<Input
				{...props}
				id={label}
				placeholder={props.placeholder}
				height="50"
			/>
		</FormControl>
	);
}

export function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export default InputField;
