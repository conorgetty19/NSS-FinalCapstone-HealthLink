import React from "react";
import GroupForm from "./GroupForm";
import { createGroup } from "../../modules/groupManager";
import { addGroupUser } from "../../modules/userProfileManager";
import { useState, useEffect } from "react";
import { getCurrentUserFromLocalStorage } from "../../modules/userProfileManager";
import { useNavigate } from "react-router-dom";

export default function CreateGroupPage() {
    const [leadUserProfileId, setLeadUserProfileId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Get the leadUserProfileId from local storage on component mount
        const HealthLinkUserObject = getCurrentUserFromLocalStorage();
        const userId = HealthLinkUserObject?.id || null;
        setLeadUserProfileId(userId);
    }, []);

    const handleSubmit = (formData) => {
        formData.leadUserProfileId = leadUserProfileId
        // Call the API to create the group using formData
        createGroup(formData)
            .then((createdGroup) => {
                // Call the API to create the groupUser with the created group's Id and the leader's Id
                const groupUserFormData = {
                    groupId: createdGroup.id,
                    userProfileId: formData.leadUserProfileId,
                };
                addGroupUser(groupUserFormData)
                    .then((createdGroupUser) => {
                        navigate(`/group/${createdGroup.id}`);
                    })
                    .catch((error) => {
                        console.error("Error creating GroupUser:", error);
                    });
            })
            .catch((error) => {
                console.error("Error creating group:", error);
            });
    };

    return (
        <div>
            <h1>Create a Group</h1>
            <GroupForm
                group={null}
                leadUserProfileId={leadUserProfileId}
                onSubmit={handleSubmit} />
        </div>
    );
}
