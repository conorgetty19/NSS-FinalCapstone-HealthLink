import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GroupForm from "./GroupForm";
import { getGroupById } from "../modules/groupManager";

export default function EditAGroupPage() {
    const { id } = useParams();
    const [group, setGroup] = useState(null);

    useEffect(() => {
        getGroupById(id)
            .then((data) => setGroup(data))
            .catch((error) => console.error("Error fetching group details:", error));
    }, [id]);

    const handleFormSubmit = (formData) => {
        // Perform the update on the server side
        updateGroup(group.id, formData)
    }

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
