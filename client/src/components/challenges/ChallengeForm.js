import React, { useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useState } from 'react';

export default function ChallengeForm({ challenge, groups, onSubmit }) {
    const [challengeFormData, setChallengeFormData] = useState({
        title: '',
        description: '',
        endDateTime: '',
        groupId: '',
    });

    useEffect(() => {
        if (challenge) {
            setChallengeFormData({
                id: challenge.id,
                title: challenge.title || "",
                description: challenge.description || "",
                endDateTime: challenge.endDateTime || "",
                groupId: challenge.groupId || 0
            })
        }
    }, [challenge])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setChallengeFormData({ ...challengeFormData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(challengeFormData);
    };

    // Style for the form container
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
                    id="title"
                    name="title"
                    value={challengeFormData.title}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="description">Description:</Label>
                <Input
                    type="textarea"
                    id="description"
                    name="description"
                    value={challengeFormData.description}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="endDateTime">End Date:</Label>
                <Input
                    type="datetime-local"
                    id="endDateTime"
                    name="endDateTime"
                    value={challengeFormData.endDateTime}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="group">Select Group:</Label>
                <select id="group" name="groupId" onChange={handleInputChange} value={challengeFormData.groupId}>
                    <option value="">Select a group</option>
                    {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                            {group.title}
                        </option>
                    ))}
                </select>
            </FormGroup>
            <Button type="submit" color="primary">Submit</Button>
        </Form>
    );
};