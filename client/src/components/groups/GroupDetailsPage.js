import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getGroupById } from "../../modules/groupManager";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Nav } from "reactstrap";
import { getCurrentUserFromLocalStorage } from "../../modules/userProfileManager";
import { addGroupUser } from "../../modules/userProfileManager";
import { deleteGroupUser } from "../../modules/userProfileManager";

export default function GroupDetailsPage() {
    const [group, setGroup] = useState(null);
    const { id } = useParams();
    const defaultImageUrl =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png";
    const currentUser = getCurrentUserFromLocalStorage();
    const currentUserId = currentUser.id;
    const Navigate = useNavigate();
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

    const handleLeaveGroup = () => {
        const groupUserId = groupUser.id;
        deleteGroupUser(groupUserId)
            .then(() => {
                window.location.reload();
            })
    }

    useEffect(() => {
        getGroupById(id)
            .then((data) => {
                setGroup(data)
            })
            .catch((error) => console.error("Error fetching group details:", error));
    }, [id]);

    if (!group) {
        return <div>Loading...</div>;
    }

    const isMember = group.members.some((member) => member.userProfileId === currentUserId);
    const groupUser = isMember ? group.members.find((member) => member.userProfileId === currentUserId) : null;

    return (
        <div style={pageStyle} className="d-flex justify-content-between">
            <div className="d-flex flex-column" style={columnStyle}>
                <h1>{group.title}</h1>
                <div style={{ marginLeft: "1rem" }}>
                    <p className="h6">Leader: {group.leadUserProfile.username}</p>
                    {group.imageUrl && (
                        <img src={group.imageUrl} alt="Group"
                            style={{ width: "17.5rem", height: "auto", marginRight: "10px" }} />
                    )}
                    <p className="h5">{group.description}</p>

                    <div className="mt-2 mb-2">
                        {!isMember && (
                            <Button onClick={handleJoinGroup} color="primary" className="mr-2">
                                Join Group
                            </Button>
                        )}
                        {isMember && (
                            <Button onClick={handleLeaveGroup} color="secondary" className="mr-2">
                                Leave Group
                            </Button>
                        )}
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
                    {group.members.map((member) => (
                        <Card key={member.id} className="m-2" style={{ width: "18rem" }}>
                            <CardImg
                                top
                                width="100%"
                                src={member.userProfile.imageUrl || defaultImageUrl}
                                alt={member.userProfile.username}
                                style={{ width: "20%", height: "auto", marginRight: "10px", marginLeft: "4px", marginTop: "4px" }}
                            />
                            <CardBody>
                                <CardTitle tag="h5">{member.userProfile.username}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">
                                </CardSubtitle>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
            <div style={columnStyle}>
                <h2>Challenges</h2>
                <div className="d-flex flex-wrap">
                    {group.challenges.map((challenge) => (
                        <Card key={challenge.id} className="m-2" style={{ width: "18rem" }}>
                            <CardBody>
                                <Link to={`/challenge/${challenge.id}`}>
                                    <CardTitle tag="h5">{challenge.title}</CardTitle>
                                </Link>
                                <CardText>{challenge.description}</CardText>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </div >
    );
}
