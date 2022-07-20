import { Urls } from "../common";

export interface Topic {
	id: string;
	slug: string;
	title: string;
	description: string;
	published_at: Date;
	updated_at: Date;
	starts_at: Date;
	ends_at: null;
	only_submissions_after: null;
	visibility: string;
	featured: boolean;
	total_photos: number;
	links: TopicLinks;
	status: string;
	owners: User[];
	current_user_contributions: any[];
	total_current_user_submissions: TotalCurrentUserSubmissions;
	cover_photo: CoverPhoto;
}

interface CoverPhoto {
	id: string;
	created_at: Date;
	updated_at: Date;
	promoted_at: null;
	width: number;
	height: number;
	color: string;
	blur_hash: string;
	description: string;
	alt_description: string;
	urls: Urls;
	links: CoverPhotoLinks;
	user: User;
	preview_photos: PreviewPhoto[];
}

interface CoverPhotoLinks {
	self: string;
	html: string;
	download: string;
	download_location: string;
}

interface PreviewPhoto {
	id: string;
	created_at: Date;
	updated_at: Date;
	urls: Urls;
}

interface User {
	id: string;
	updated_at: Date;
	username: string;
	name: string;
	first_name: string;
	last_name: null;
	twitter_username: string;
	portfolio_url: string;
	bio: string;
	location: string;
	links: UserLinks;
	profile_image: ProfileImage;
	instagram_username: string;
	total_collections: number;
	total_likes: number;
	total_photos: number;
	accepted_tos: boolean;
}

interface UserLinks {
	self: string;
	html: string;
	photos: string;
	likes: string;
	portfolio: string;
	following: string;
	followers: string;
}

interface ProfileImage {
	small: string;
	medium: string;
	large: string;
}

interface TopicLinks {
	self: string;
	html: string;
	photos: string;
}

interface TotalCurrentUserSubmissions {}
