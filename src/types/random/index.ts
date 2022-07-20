import { Urls } from "../common";

export interface RandomPhoto {
	id: string;
	created_at: Date;
	updated_at: Date;
	width: number;
	height: number;
	color: string;
	blur_hash: string;
	downloads: number;
	likes: number;
	liked_by_user: boolean;
	description: string;
	exif: Exif;
	location: Location;
	current_user_collections: CurrentUserCollection[];
	urls: Urls;
	links: RandomPhotoLinks;
	user: User;
}

interface CurrentUserCollection {
	id: number;
	title: string;
	published_at: Date;
	last_collected_at: Date;
	updated_at: Date;
	cover_photo: null;
	user: null;
}

interface Exif {
	make: string;
	model: string;
	exposure_time: string;
	aperture: string;
	focal_length: string;
	iso: number;
}

interface RandomPhotoLinks {
	self: string;
	html: string;
	download: string;
	download_location: string;
}

interface Location {
	name: string;
	city: string;
	country: string;
	position: Position;
}

interface Position {
	latitude: number;
	longitude: number;
}

interface User {
	id: string;
	updated_at: Date;
	username: string;
	name: string;
	portfolio_url: string;
	bio: string;
	location: string;
	total_likes: number;
	total_photos: number;
	total_collections: number;
	instagram_username: string;
	twitter_username: string;
	profile_image: profileImage;
	links: UserLinks;
}

interface UserLinks {
	self: string;
	html: string;
	photos: string;
	likes: string;
	portfolio: string;
}

interface profileImage {
	small: string;
	medium: string;
	large: string;
}
