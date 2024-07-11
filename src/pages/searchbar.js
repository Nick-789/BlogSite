import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <>
        <form className="submit_container">
            <input
                type="text"
                id="search-input"
                name="query"
                placeholder="Search..."
                value={query}
                className="submit_text"
                
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="button" id="search-button" onClick={handleSearch}>
                Search
            </button>
            </form>
        </>
    );
}
