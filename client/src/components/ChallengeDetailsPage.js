import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getChallengeById } from '../modules/challengeManager';
import { getGroupById } from '../modules/groupManager';
import { getCurrentUserFromLocalStorage } from '../modules/userProfileManager';

export default function ChallengeDetailsPage() {
    const { id } = useParams();
    const [challenge, setChallenge] = useState([]);
    const [group, setGroup] = useState([]);
    const [isUserMember, setIsUserMember] = useState(false);

    useEffect(() => {
        // Fetch challenge details
        console.log(id)
        getChallengeById(id)
            .then((data) => setChallenge(data))
            .catch((error) => console.error(error));
    }, [id]);

    useEffect(() => {
        // Fetch associated group details when the challenge state is updated
        if (challenge && challenge.groupId) {
            getGroupById(challenge.groupId)
                .then((data) => {
                    setGroup(data)
                    const currentUser = getCurrentUserFromLocalStorage();
                    const isMember = data.members.some((member) => member.userProfileId === currentUser.id);
                    setIsUserMember(isMember);
                })
                .catch((error) => console.error(error));
        }
    }, [challenge]);

    const renderChallengeDetails = () => {
        if (!challenge) {
            return <p>Loading challenge details...</p>;
        }

        const currentDate = new Date();
        const isBeforeEndDate = currentDate < new Date(challenge.endDateTime);

        return (
            <div>
                <h2>{challenge.title}</h2>
                {isBeforeEndDate && isUserMember && (
                    <Link to={`/challenge/${id}/edit`}>Edit</Link>
                )}
                <p>{challenge.description}</p>
                <p>Start Date: {new Date(challenge.createdDateTime).toLocaleDateString()}</p>
                <p>End Date: {new Date(challenge.endDateTime).toLocaleDateString()}</p>

                {group && (
                    <p>
                        Associated Group:{' '}
                        <Link to={`/group/${group.id}`}>{group.title}</Link>
                    </p>
                )}

                <h3>{isBeforeEndDate ? 'Member Progress' : 'Member Results'}</h3>
                {/* Display member progress or member results here */}
            </div>
        );
    };

    return (
        <div>
            <h1>Challenge Details</h1>
            {renderChallengeDetails()}
        </div>
    );
};
