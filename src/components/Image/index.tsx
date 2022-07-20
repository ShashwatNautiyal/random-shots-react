import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { Blurhash, BlurhashCanvas } from "react-blurhash";
import { Urls } from "../../types/common";
import { classNames } from "../../utils";

const Image = ({
	urls,
	blurHash,
	loading,
	alt,
	className,
	objectFit = "cover",
	imageCustomStyles,
}: {
	urls: {
		[key: string]: any;
	};
	blurHash?: string;
	loading: "lazy" | "eager" | undefined;
	alt?: string;
	objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
	className?: string;
	imageCustomStyles?: CSSProperties;
}) => {
	const [showBlurhash, setShowBlurhash] = useState(true);

	const srcSet: string[] = [];

	const showImage = () => {
		setShowBlurhash(false);
	};

	for (let [key, value] of Object.entries(urls)) {
		if (value.includes("w=")) {
			const url = `${value} ${
				(value as string)
					.split("&")
					.find((item) => item.includes("w="))
					?.split("=")[1]
			}w`;
			srcSet.push(url);
		}
	}

	return (
		<span style={{ position: "relative" }} className={className}>
			{showBlurhash && blurHash && (
				<BlurhashCanvas
					hash={blurHash}
					style={imageCustomStyles}
					className="absolute inset-0 w-full h-full"
					punch={4}
					height={12}
					width={12}
				/>
			)}
			<img
				onLoad={showImage}
				loading={loading}
				style={{ ...imageCustomStyles, objectFit: objectFit }}
				sizes="100vw"
				srcSet={srcSet.join(", ")}
				className={classNames(
					showBlurhash ? "opacity-0" : "opacity-100 overflow-hidden",
					"transition-opacity duration-300 h-full w-full"
				)}
				alt={alt}
				src={urls.full}
			/>
		</span>
	);
};

export default Image;
