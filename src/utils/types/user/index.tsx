export interface User {
	id: string;
	updated_at: Date;
	username: string;
	name: string;
	first_name: string;
	last_name: string;
	twitter_username: null;
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
	for_hire: boolean;
	social: Social;
	followed_by_user: boolean;
	photos: Photo[];
	badge: null;
	tags: Tags;
	followers_count: number;
	following_count: number;
	allow_messages: boolean;
	numeric_id: number;
	downloads: number;
	meta: Meta;
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

interface Meta {
	index: boolean;
}

interface Photo {
	id: string;
	created_at: Date;
	updated_at: Date;
	blur_hash: string;
	urls: Urls;
}

interface Urls {
	raw: string;
	full: string;
	regular: string;
	small: string;
	thumb: string;
	small_s3: string;
}

interface ProfileImage {
	small: string;
	medium: string;
	large: string;
}

interface Social {
	instagram_username: null | string;
	portfolio_url: null | string;
	twitter_username: null | string;
	paypal_email: null;
}

interface Tags {
	custom: Custom[];
	aggregated: Aggregated[];
}

interface Aggregated {
	type: Type;
	title: string;
	source?: AggregatedSource;
}

interface AggregatedSource {
	ancestry: Ancestry;
	title: string;
	subtitle: string;
	description: string;
	meta_title: string;
	meta_description: string;
	cover_photo: PurpleCoverPhoto;
}

interface Ancestry {
	type: Category;
	category?: Category;
	subcategory?: Category;
}

interface Category {
	slug: string;
	pretty_slug: string;
}

interface PurpleCoverPhoto {
	id: string;
	created_at: Date;
	updated_at: Date;
	promoted_at: Date;
	width: number;
	height: number;
	color: string;
	blur_hash: string;
	description: null | string;
	alt_description: null | string;
	urls: Urls;
	links: CoverPhotoLinks;
	categories: any[];
	likes: number;
	liked_by_user: boolean;
	current_user_collections: any[];
	sponsorship: null;
	topic_submissions: PurpleTopicSubmissions;
	user: UserClass;
}

interface CoverPhotoLinks {
	self: string;
	html: string;
	download: string;
	download_location: string;
}

interface PurpleTopicSubmissions {
	"color-of-water"?: Animals;
	architecture?: Animals;
	wallpapers?: Animals;
	nature?: Animals;
	"textures-patterns"?: Animals;
	animals?: Animals;
	"arts-culture"?: Animals;
	health?: Animals;
	fashion?: Animals;
	experimental?: Animals;
	spirituality?: Animals;
}

interface Animals {
	status: Status;
	approved_on: Date;
}

export enum Status {
	Approved = "approved",
}

interface UserClass {
	id: string;
	updated_at: Date;
	username: string;
	name: string;
	first_name: string;
	last_name: string;
	twitter_username: null | string;
	portfolio_url: null | string;
	bio: null | string;
	location: null | string;
	links: UserLinks;
	profile_image: ProfileImage;
	instagram_username: null | string;
	total_collections: number;
	total_likes: number;
	total_photos: number;
	accepted_tos: boolean;
	for_hire: boolean;
	social: Social;
}

export enum Type {
	LandingPage = "landing_page",
	Search = "search",
}

interface Custom {
	type: Type;
	title: string;
	source?: CustomSource;
}

interface CustomSource {
	ancestry: Ancestry;
	title: string;
	subtitle: string;
	description: string;
	meta_title: string;
	meta_description: string;
	cover_photo: FluffyCoverPhoto;
}

interface FluffyCoverPhoto {
	id: string;
	created_at: Date;
	updated_at: Date;
	promoted_at: Date | null;
	width: number;
	height: number;
	color: string;
	blur_hash: string;
	description: string;
	alt_description: null | string;
	urls: Urls;
	links: CoverPhotoLinks;
	categories: any[];
	likes: number;
	liked_by_user: boolean;
	current_user_collections: any[];
	sponsorship: null;
	topic_submissions: FluffyTopicSubmissions;
	user: UserClass;
}

interface FluffyTopicSubmissions {
	"color-of-water"?: Animals;
	architecture?: Animals;
	wallpapers?: Animals;
	nature?: Animals;
	travel?: Animals;
}
