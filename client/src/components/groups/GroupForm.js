import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

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

    const pageStyle = {
        width: "300px",
        margin: "auto",
        marginTop: "40px",
        boxShadow: "0 10px 15px rgba(179, 179, 179, 0.7)",
        padding: "15px"
    }

    return (
        <Form style={pageStyle} onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="title">Title:</Label>
                <Input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="description">Description:</Label>
                <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="imageUrl">Image URL:</Label>
                <Input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                />
            </FormGroup>
            {/* Hidden Input field for leadUserProfileId */}
            <Input type="hidden" name="leadUserProfileId" value={formData.leadUserProfileId} />
            <Button type="submit" color="primary">{group ? "Update Group" : "Create Group"}</Button>
        </Form>
    );
}
