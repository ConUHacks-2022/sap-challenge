import React, { PropsWithChildren as Props } from "react";

interface ICasTitleProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {}

function CasTitle({ children, ...props }: Props<ICasTitleProps>) {
	return (
		<div
			{...props}
			style={{
				...props.style,
				color: props.style?.color || "black",
				fontSize: props.style?.fontSize || "0.4in",
				fontFamily: props.style?.fontFamily || "'Merriweather', serif",
			}}
		>
			{children}
		</div>
	);
}

export default CasTitle;
