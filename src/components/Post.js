import React, { useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import EditPostPopup from './EditPostPopup';

export default function Post({ _id, title, summary, filepath, author, createdAt, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const imageUrl = `http://localhost:4000/blog-app/${filepath.replace(/\\/g, '/')}`;

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleClosePopup = () => {
        setIsEditing(false);
    };

    return (
        <div className="post">
            <div className="image">
                <Link to={`/upload/${_id}`}>
                    <img src={imageUrl} alt="Not available" />
                </Link>
            </div>
            <div className="texts">
                <div className="title-and-delete">
                    <Link to={`/upload/${_id}`} className="link">
                        <h2>{title}</h2>
                    </Link>
                    <div className="icons">
                        <i className="far fa-trash-alt delete-icon" onClick={() => { onDelete(_id) }}></i>
                        <i className="far fa-edit edit-icon" onClick={handleEditClick}></i>
                    </div>
                </div>
                <p className="info">
                    <a className="author">{author.username}</a>
                    <time>{format(new Date(createdAt), "MMMM d, yyyy")}</time>
                </p>
                <p className="summary">{summary}</p>
            </div>
            {isEditing && <EditPostPopup post={{ _id, title, summary, content: 'Some content' }} onClose={handleClosePopup} onUpdate={onUpdate} />}
        </div>
    );
}
