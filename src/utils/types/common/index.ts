export interface Urls {
	raw: string;
	full: string;
	regular: string;
	small: string;
	small_s3: string;
	thumb: string;
}

export type FilterOptions = {
	order_by: "latest" | "relevant";
	color:
		| "black_and_white"
		| "black"
		| "white"
		| "yellow"
		| "orange"
		| "red"
		| "purple"
		| "magenta"
		| "green"
		| "teal";
	orientation: "landscape" | "portrait" | "squarish";
	content_filter: "low" | "high";
};

export type FilterOptionsType<T> = {
	value: T;
	label: string;
	Icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
}[];
