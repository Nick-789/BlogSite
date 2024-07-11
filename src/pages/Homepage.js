import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import SearchBar from "./searchbar";
import Fuse from "fuse.js";
import axios from "axios";

export default function Homepage() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]); 
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/upload')
            .then(response => response.json())
            .then(posts => {
                setPosts(posts);
            });
    }, []);

    const handleSearch = (searchKeyword) => {
        if (searchKeyword.trim() === "") {
            setFilteredPosts([]);
            return;
        }

        const fuse = new Fuse(posts, {
            keys: ["title"],
            threshold: 0.3, 
        });

        const searchResults = fuse.search(searchKeyword);
        setFilteredPosts(searchResults.map(result => result.item));

        setInitialLoad(false);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/upload/${id}`, { withCredentials: true });
            setPosts(posts => posts.filter(post => post._id !== id));
            setFilteredPosts(filteredPosts => filteredPosts.filter(post => post._id !== id));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleUpdate = (updatedPost) => {
        setPosts(posts => posts.map(post => post._id === updatedPost._id ? updatedPost : post));
        setFilteredPosts(filteredPosts => filteredPosts.map(post => post._id === updatedPost._id ? updatedPost : post));
    };

    return (
        <>
            <SearchBar onSearch={handleSearch} />
            {(initialLoad ? posts : filteredPosts).map(post => (
                <Post key={post._id} {...post} onDelete={handleDelete} onUpdate={handleUpdate} />
            ))}
        </>
    );
}
