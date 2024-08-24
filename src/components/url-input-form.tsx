import React, { ChangeEvent, FormEvent, useState } from "react";

interface URLInputFormProps {
	onSubmit: (urls: string[]) => void;
}

const URLInputForm: React.FC<URLInputFormProps> = ({ onSubmit }) => {
	const [urls, setUrls] = useState<string[]>([""]);
	const [formError, setFormError] = useState<string | null>(null);

	const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
		const newUrls = [...urls];
		newUrls[index] = event.target.value;
		setUrls(newUrls);
	};

	const handleAddInput = () => {
		setUrls([...urls, ""]);
	};
	const handleRemoveInput = (index: number) => {
		const newUrls = urls.filter((_, i) => i !== index);
		setUrls(newUrls);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const filteredUrls = urls.filter((url) => url.trim() !== "");
		if (filteredUrls.length < 3) {
			setFormError("Please enter at least 3 URLs.");
			return;
		}
		onSubmit(filteredUrls);
		setFormError(null)
		setUrls([""])
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{urls.map((url, index) => (
				<div key={index} className="relative">
					<input
						type="text"
						value={url}
						required
						onChange={(e) => handleChange(index, e)}
						placeholder={`URL ${index + 1}`}
						className="w-full p-2 pr-10 border border-gray-300 rounded"
					/>
					{urls.length > 1 && (
						<button
							type="button"
							onClick={() => handleRemoveInput(index)}
							className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white p-1 rounded"
						>
							Remove
						</button>
					)}

				</div>
			))}
			<button
				type="button"
				onClick={handleAddInput}
				className="w-full bg-blue-500 text-white p-2 rounded"
			>
				Add another URL
			</button>
			<button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
				Fetch Metadata
			</button>
			{formError && <p className="text-red-500 mt-2">{formError}</p>}
		</form>
	);
};

export default URLInputForm;
