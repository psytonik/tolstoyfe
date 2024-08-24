import React from "react";

const Loader: React.FC<HTMLDivElement> = () => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
			<div className="flex flex-col items-center">
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-4"></div>
				<p className="text-white text-xl">Loading, please wait...</p>
			</div>
		</div>
	);
};

export default Loader;
