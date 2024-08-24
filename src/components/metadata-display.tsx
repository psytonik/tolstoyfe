import React from "react";
import {ErrorResponse,Data} from "../interfaces";

interface MetadataDisplayProps {
	metadata: Data[];
	errors: ErrorResponse[] | null;
}
const MetadataDisplay: React.FC<MetadataDisplayProps> = ({ metadata, errors }) => {
	return (
		<div className="mt-6 space-y-4">
			{metadata.map((item, i) => (
				<div key={i} className="bg-gray-50 p-4 rounded shadow">
					<h3 className="text-xl font-semibold">{item.metadata.title}</h3>
					<p className="text-gray-700">{item.metadata.description}</p>
					<a href={item.url} target="_blank" rel="noopener noreferrer">
						{item.metadata.image === 'No image found' ? (
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
								alt="No Image Avaliable"
								className="w-full h-48 object-cover rounded mt-2"
							/>
							): (
							<img
								src={item.metadata.image}
								alt={item.metadata.title}
								className="w-full h-48 object-cover rounded mt-2"
							/>
						)}
					</a>
				</div>
			))}
			{errors &&
				errors.map((err, i) => (
					<p key={i} className="text-red-500">
						{err.url} - {err.error}
					</p>
				))}
		</div>
	);
};

export default MetadataDisplay;
