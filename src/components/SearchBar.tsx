function SearchBar({ stockName, onChange }: { stockName: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <>
      <input className="input" type="text" value={stockName} onChange={onChange} />
    </>
  );
}

export default SearchBar;
