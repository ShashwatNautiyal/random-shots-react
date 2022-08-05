import { CSSProperties } from "react";

type PrimaryButtonProps = {
	text: string;
	name?: string;
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	bgColor?: string;
	textColor?: string;
	borderColor?: string;
	customStyle?: CSSProperties;
};

const PrimaryButton = (props: PrimaryButtonProps) => {
	const {
		name,
		text,
		onClick,
		disabled,
		type,
		customStyle,
		bgColor = "bg-blue-500",
		textColor = "text-white",
		borderColor = "border-transparent",
	} = props;

	return (
		<button
			onClick={onClick}
			style={customStyle}
			name={name}
			disabled={disabled}
			type={type ?? "button"}
			className={`flex focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none justify-center shadow-sm rounded-md items-center text-sm ${textColor} py-2 px-10 font-medium ${bgColor} hover:enabled:${bgColor} disabled:opacity-60 border-2 ${borderColor}`}
		>
			{text}
		</button>
	);
};

export default PrimaryButton;
