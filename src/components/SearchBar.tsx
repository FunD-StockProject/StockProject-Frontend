function SearchBar({ stockName, onChange }: { stockName: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <input className="input" type="text" value={stockName} onChange={onChange} />
    </div>
  );
}

export default SearchBar;
