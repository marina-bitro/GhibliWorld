const SearchBar = ({ search, setSearch }) => {

  return (

    <div className="flex justify-center mb-20 px-4">
      
      <div className="flex items-center bg-zinc-800 border border-zinc-700 border-t-white/10 rounded-2xl px-5 py-3.5 w-full max-w-xl transition-all duration-300 transform shadow-[inset_0_3px_6px_rgba(255,255,255,0.1),_inset_0_-4px_8px_rgba(0,0,0,0.5),_0_16px_25px_-5px_rgba(0,0,0,0.7)] focus-within:border-purple-400 focus-within:shadow-[inset_0_3px_6px_rgba(255,255,255,0.15),_inset_0_-2px_4px_rgba(0,0,0,0.5),_0_25px_35px_-5px_rgba(0,0,0,0.9)]">

        <span className="text-zinc-400 text-lg mr-3 select-none">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search Ghibli movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-white w-full placeholder:text-zinc-500 text-lg"
        />

      </div>

    </div>

  );
};

export default SearchBar;
