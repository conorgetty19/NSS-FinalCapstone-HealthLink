import React from "react";
import GroupForm from "./groups/GroupForm";
import { createGroup } from "../modules/groupManager";
import { addGroupUser } from "../modules/userProfileManager";
import { useState, useEffect } from "react";

export default function CreateGroupPage() {
    const [leadUserProfileId, setLeadUserProfileId] = useState(null);

    useEffect(() => {
        // Get the leadUserProfileId from local storage on component mount
        const localHealthLinkUser = localStorage.getItem("healthlink_user");
        const HealthLinkUserObject = JSON.parse(localHealthLinkUser);
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
                        console.log("GroupUser created successfully:", createdGroupUser);
                        console.log("Group created successfully:", createdGroup);
                        // Handle success
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
            <h1>Create a New Group</h1>
            <GroupForm
                group={null}
                leadUserProfileId={leadUserProfileId}
                onSubmit={handleSubmit} />
        </div>
    );
}
