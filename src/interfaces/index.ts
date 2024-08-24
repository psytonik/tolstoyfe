export interface Data {
	url: string;
	metadata: Metadata
}
export interface Metadata {
	title: string;
	description: string;
	image: string;
}

export interface ErrorResponse {
	url: string;
	error: string;
}
