import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getChallengeById } from '../modules/challengeManager';
import { getGroupById } from '../modules/groupManager';
import { getCurrentUserFromLocalStorage } from '../modules/userProfileManager';
import MemberResultCard from './results/MemberResultsCard';
import { getResultsByChallengeId } from '../modules/resultManager';

export default function ChallengeDetailsPage() {
    const { id } = useParams();
    const [challenge, setChallenge] = useState([]);
    const [group, setGroup] = useState([]);
    const [isLeader, setIsLeader] = useState(false);
    const [results, setResults] = useState([]);

    useEffect(() => {
        // Fetch challenge details
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
                    let leaderStatus = false;
                    if (currentUser.id === data.leadUserProfileId) {
                        leaderStatus = true;
                    }
                    setIsLeader(leaderStatus);
                })
                .catch((error) => console.error(error));
        }
    }, [challenge]);

    useEffect(() => {
        // Fetch associated results when the challenge state is updated
        if (challenge && challenge.id) {
            getResultsByChallengeId(challenge.id)
                .then((data) => setResults(data))
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
                {isBeforeEndDate && isLeader && (
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
                {challenge && results.map((result) => (
                    <MemberResultCard key={result.id} result={result} />
                ))}
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
