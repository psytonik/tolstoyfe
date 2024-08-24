import axios from "axios";

export const fetcher = async (urls: string[]) => {
	return await axios.post('https://tolstoybe.onrender.com', { urls });
}
