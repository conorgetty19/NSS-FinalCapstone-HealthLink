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


    const pageStyle = {
        margin: "15px"
    }

    // Fetch the lead user's profile ID from local storage when the component mounts
    useEffect(() => {
        // Get the leadUserProfileId from local storage on component mount
        const HealthLinkUserObject = getCurrentUserFromLocalStorage();
        const userId = HealthLinkUserObject?.id || null;
        setLeadUserProfileId(userId);
    }, []);

    // Handle the form submission
    const handleSubmit = (formData) => {
        formData.leadUserProfileId = leadUserProfileId
        // Call the API to create the group using formData
        createGroup(formData)
            .then((createdGroup) => {
                const groupUserFormData = {
                    groupId: createdGroup.id,
                    userProfileId: formData.leadUserProfileId,
                };
                // Create a groupUser associated with the created group and the leader's profile
                addGroupUser(groupUserFormData)
                    .then((createdGroupUser) => {
                        // Navigate to the newly created group's page
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
        <div style={pageStyle}>
            <h1>Create a Group</h1>
            <GroupForm
                group={null}
                leadUserProfileId={leadUserProfileId}
                onSubmit={handleSubmit} />
        </div>
    );
}
