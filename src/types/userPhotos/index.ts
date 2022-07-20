import { Urls } from "../common";

export interface UserPhoto {
	id: string;
	created_at: Date;
	updated_at: Date;
	promoted_at: Date | null;
	width: number;
	height: number;
	color: string;
	blur_hash: string;
	description: string | null;
	alt_description: string | null;
	urls: Urls;
	links: UserPhotoLinks;
	categories: any[];
	likes: number;
	liked_by_user: boolean;
	current_user_collections: any[];
	sponsorship: string | null;
	topic_submissions: unknown;
	user: User;
}

export interface UserPhotoLinks {
	self: string;
	html: string;
	download: string;
	download_location: string;
}

export interface User {
	id: string;
	updated_at: Date;
	username: string;
	name: string;
	first_name: string;
	last_name: string;
	twitter_username: string;
	portfolio_url: string;
	bio: string;
	location: Location;
	links: UserLinks;
	profile_image: ProfileImage;
	instagram_username: string;
	total_collections: number;
	total_likes: number;
	total_photos: number;
	accepted_tos: boolean;
	for_hire: boolean;
	social: Social;
}

export interface UserLinks {
	self: string;
	html: string;
	photos: string;
	likes: string;
	portfolio: string;
	following: string;
	followers: string;
}

export interface ProfileImage {
	small: string;
	medium: string;
	large: string;
}

export interface Social {
	instagram_username: string;
	portfolio_url: string;
	twitter_username: string;
	paypal_email: string | null;
}
