function SearchBar({
	stockName,
	onChange,
	onKeyDown = (()=>{}),
}: {
	stockName: string;
	onChange?: (e: any) => void;
	onKeyDown?: (e: any) => void;
}) {
	return (
		<div>
			<input
				className="input"
				type="text"
				value={stockName}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
		</div>
	);
}

export default SearchBar;
