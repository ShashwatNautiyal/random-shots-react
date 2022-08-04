import { decode } from "blurhash";
import { useEffect, useRef } from "react";

type Props = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
	hash: string;
	width?: number;
	height?: number;
	punch?: number;
};

export const Blurhash = ({ hash, width = 16, height = 16, punch = 1, ...rest }: Props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvasRef.current) {
			const pixels = decode(hash, width, height, punch);

			const canvas = canvasRef.current;
			canvas.width = width;
			canvas.height = height;
			const context = canvas.getContext("2d");
			const imageData = context!.createImageData(width, height);
			imageData.data.set(pixels);
			context!.putImageData(imageData, 0, 0);
		}
	}, [hash, height, width, punch, canvasRef.current]);

	return <canvas {...rest} ref={canvasRef}></canvas>;
};
