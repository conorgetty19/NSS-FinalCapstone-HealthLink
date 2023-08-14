import React from 'react';

export default function ResultForm({ result, onContentChange }) {
    return (
        <div>
            <label htmlFor="content">Content:</label>
            <input
                type="text"
                id="content"
                value={result?.content || ""}
                onChange={(e) => onContentChange(e.target.value)}
            />
        </div>
    );
};
