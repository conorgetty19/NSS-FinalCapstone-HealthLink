import React, { useState, useEffect } from "react";

export default function GroupForm({ group, leadUserProfileId, onSubmit }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imageUrl: "",
        leadUserProfileId: leadUserProfileId || 0,
    });

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            leadUserProfileId: leadUserProfileId || 0,
        }));

        if (group) {
            setFormData({
                title: group.title || "",
                description: group.description || "",
                imageUrl: group.imageUrl || "",
                leadUserProfileId: group.leadUserProfileId || leadUserProfileId,
            });
        }
    }, [group]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                />
            </div>
            {/* Hidden input field for leadUserProfileId */}
            <input type="hidden" name="leadUserProfileId" value={formData.leadUserProfileId} />
            <button type="submit">{group ? "Update Group" : "Create Group"}</button>
        </form>
    );
}
