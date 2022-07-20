type PrimaryButtonProps = {
	text: string;
	name?: string;
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	bgColor?: string;
};

const PrimaryButton = (props: PrimaryButtonProps) => {
	const { name, text, onClick, disabled, type, bgColor = "bg-red-500" } = props;
	return (
		<button
			onClick={onClick}
			name={name}
			disabled={disabled}
			type={type ?? "button"}
			className={`flex focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none justify-center shadow-sm rounded-md items-center text-sm text-white py-2 px-10 font-medium ${bgColor} hover:enabled:${bgColor} disabled:opacity-60`}
		>
			{text}
		</button>
	);
};

export default PrimaryButton;
