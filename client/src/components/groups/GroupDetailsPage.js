import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getGroupById } from "../../modules/groupManager";
import { Button } from "reactstrap";
import { getCurrentUserFromLocalStorage } from "../../modules/userProfileManager";
import { addGroupUser } from "../../modules/userProfileManager";
import { deleteGroupUser } from "../../modules/userProfileManager";
import GroupMemberCard from "./GroupMemberCard";
import GroupChallengeCard from "./GroupChallengeCard";

export default function GroupDetailsPage() {
    const [group, setGroup] = useState(null);
    const { id } = useParams();

    const currentUser = getCurrentUserFromLocalStorage();
    const currentUserId = currentUser.id;

    const Navigate = useNavigate();

    //assorted styles
    const pageStyle = {
        margin: "15px",
        height: "30rem",
        width: "95%"
    }
    const editButtonStyle = {
        marginLeft: "10px"
    }
    const columnStyle = {
        width: "calc(100% / 3)"
    }

    // Handler for joining groups
    const handleJoinGroup = () => {
        const groupUser = {
            groupId: group.id,
            userProfileId: currentUserId,
        };
        addGroupUser(groupUser)
            .then(() => {
                window.location.reload();
            })
    };
    // Handler for leaving groups
    const handleLeaveGroup = () => {
        const groupUserId = groupUser.id;
        deleteGroupUser(groupUserId)
            .then(() => {
                window.location.reload();
            })
    }

    // Fetch group details on component mount
    useEffect(() => {
        getGroupById(id)
            .then((data) => {
                setGroup(data)
            })
            .catch((error) => console.error("Error fetching group details:", error));
    }, [id]);

    // Render loading if group data is not yet fetched
    if (!group) {
        return <div>Loading...</div>;
    }

    // Check if the current user is a member of the group
    const isMember = group.members.some((member) => member.userProfileId === currentUserId);
    //if isMember, find appropriate groupUser data
    const groupUser = isMember ? group.members.find((member) => member.userProfileId === currentUserId) : null;

    return (
        <div style={pageStyle} className="d-flex justify-content-between">
            <div className="d-flex flex-column" style={columnStyle}>
                <h2>{group.title}</h2>
                <div style={{ marginLeft: "1rem" }}>
                    <p className="h6">Leader: {group.leadUserProfile.username}</p>
                    {group.imageUrl && (
                        <img src={group.imageUrl} alt="Group"
                            style={{ width: "80%", height: "auto", marginRight: "10px" }} />
                    )}
                    <p className="h5">{group.description}</p>

                    <div className="mt-2 mb-2">
                        {/*Render join group button if user is not a member yet*/}
                        {!isMember && (
                            <Button onClick={handleJoinGroup} color="primary" className="mr-2">
                                Join Group
                            </Button>
                        )}
                        {/*Render leave button is user is a member*/}
                        {isMember && (
                            <Button onClick={handleLeaveGroup} color="secondary" className="mr-2">
                                Leave Group
                            </Button>
                        )}
                        {/*Render group edit button if user is the leader or if there is no leader
                        if no leader, users should be able to take leadership
                        may require a navigation to a different edit form.?*/}
                        {currentUserId === group.leadUserProfileId || group.leadUserProfileId === null ? (
                            <Button color="primary"
                                style={editButtonStyle}
                                onClick={() => {
                                    Navigate(`/group/${group.id}/edit`);
                                }}>
                                Edit Group
                            </Button>
                        ) : null}
                    </div>
                </div>
            </div>

            <div style={columnStyle}>
                <h2>Members</h2>
                <div className="d-flex flex-wrap">
                    {/*Refactor member cards into different component*/}
                    {group.members.map((member) => (
                        <GroupMemberCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
            <div style={columnStyle}>
                <h2>Challenges</h2>
                <div className="d-flex flex-wrap">
                    {/*Refactor challenges card construction into another component*/}
                    {group.challenges.map((challenge) => (
                        <GroupChallengeCard key={challenge.id} challenge={challenge} />
                    ))}
                </div>
            </div>
        </div >
    );
}
