import axios, {AxiosResponse} from "axios";
import {ErrorResponse,Data} from "../interfaces";

interface FetcherResult {
	successfulMetadata: Data[];
	errorUrls: ErrorResponse[];
}
export const fetcher = async (urls: string[]):Promise<FetcherResult> => {
	try {
		const response: AxiosResponse<Data[] | ErrorResponse[]> = await axios.post('https://tolstoybe.onrender.com', { urls });

		const successfulMetadata: Data[] = [];
		const errorUrls: ErrorResponse[] = [];

		response.data.forEach((data: Data | ErrorResponse) => {
			if ("error" in data) {
				errorUrls.push(data as ErrorResponse);
			} else {
				successfulMetadata.push(data as Data);
			}
		});

		return { successfulMetadata, errorUrls };
	} catch (e) {
		console.error(e);
		return {
			successfulMetadata: [],
			errorUrls: [{ url: '', error: 'Network Error' }]
		};
	}
}
