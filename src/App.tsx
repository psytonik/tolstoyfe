import {useState} from "react";
import {fetcher} from "./helpers/fetcher";
import URLInputForm from "./components/url-input-form";
import MetadataDisplay from "./components/metadata-display";
import {ErrorResponse,Data} from "./components/interfaces";
import Loader from "./components/loader.tsx";

const App = () => {
    const [metadata, setMetadata] = useState<Data[]>([]);
    const [error, setError] = useState<ErrorResponse[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (urls: string[]) => {
        setLoading(true)
        try {
            const response = await fetcher(urls)

            const successfulMetadata: Data[] = [];
            const errorUrls: ErrorResponse[] = [];

            response.data.forEach((data: ErrorResponse | Data) => {
                if ("error" in data) {
                    errorUrls.push(data as ErrorResponse);
                } else {
                    successfulMetadata.push(data as Data);
                }
            });

            setMetadata(successfulMetadata);

            setError(errorUrls);
        } catch (e) {
            console.error(e);
            setError([{url: '', error: 'Network Error'}]);
        } finally {
            setLoading(false)
        }
    };

  return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
          <h1 className="text-3xl font-bold mb-6">URL Meta Data Fetcher</h1>
          <div className="w-full max-w-lg bg-white p-6 rounded shadow">
              {loading && <Loader/>}
              <URLInputForm onSubmit={handleSubmit}/>
              <MetadataDisplay metadata={metadata} errors={error} />
          </div>
      </div>
  )
}

export default App
