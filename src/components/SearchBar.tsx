function SearchBar({
	stockName,
	onChange,
}: {
	stockName: string;
	onChange: (e: any) => void;
}) {
	return (
		<div>
			<input
				className="input"
				type="text"
				value={stockName}
				onChange={onChange}
			/>
		</div>
	);
}

export default SearchBar;
