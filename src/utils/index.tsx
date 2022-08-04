export const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(" ");
};

export const downloadPhoto = async (downloadLink?: string, name?: string) => {
	try {
		if (!downloadLink) return;
		const image = await fetch(downloadLink);
		const imageBlog = await image.blob();
		const imageURL = URL.createObjectURL(imageBlog);

		const link = document.createElement("a");
		link.href = imageURL;
		link.download = name ?? "unsplash-photo";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (err) {
		console.log(err);
	}
};
