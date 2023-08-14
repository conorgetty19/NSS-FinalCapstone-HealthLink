import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GroupForm from "./GroupForm";
import { getGroupById } from "../../modules/groupManager";
import { updateGroup } from "../../modules/groupManager";

export default function EditAGroupPage() {
    const { id } = useParams();

    const [group, setGroup] = useState(null);

    const navigate = useNavigate();

    // Fetch the group details based on the group ID when the component mounts
    useEffect(() => {
        getGroupById(id)
            .then((data) => setGroup(data))
            .catch((error) => console.error("Error fetching group details:", error));
    }, [id]);

    // Handle form submission for updating the group
    const handleFormSubmit = (formData) => {
        // Perform the update on the server side
        updateGroup(group.id, formData).then(
            () => {
                // Navigate back to the group details page after successful update
                navigate(`/group/${id}`)
            }
        )
    }

    // Display a loading message while waiting for group data to load
    if (!group) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Group</h1>
            <GroupForm group={group} onSubmit={(formData) => handleFormSubmit(formData)} />
        </div>
    );
};
