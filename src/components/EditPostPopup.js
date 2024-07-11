import React, { useState } from 'react';
import axios from 'axios';

export default function EditPostPopup({ post, onClose, onUpdate }) {
    const [title, setTitle] = useState(post.title);
    const [summary, setSummary] = useState(post.summary);
    const [content, setContent] = useState(post.content);

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/upload/${post._id}`, {
                title,
                summary,
                content
            }, { withCredentials: true });

            onUpdate(response.data);  // Update the post in the frontend
            onClose();  // Close the popup
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <div className="edit-post-popup">
            <h2>Edit Post</h2>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
                Summary:
                <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} />
            </label>
            <label>
                Content:
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}
