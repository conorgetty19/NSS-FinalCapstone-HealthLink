import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getChallengeById } from '../../modules/challengeManager';
import { getGroupById } from '../../modules/groupManager';
import { getCurrentUserFromLocalStorage } from '../../modules/userProfileManager';
import MemberResultCard from '../results/MemberResultsCard';
import { getResultsByChallengeId } from '../../modules/resultManager';

export default function ChallengeDetailsPage() {
    const { challengeId } = useParams();
    const [challenge, setChallenge] = useState([]);
    const [group, setGroup] = useState([]);
    const [isLeader, setIsLeader] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [hasResults, setHasResults] = useState(false);
    const [results, setResults] = useState([]);
    const currentUser = getCurrentUserFromLocalStorage();
    const Navigate = useNavigate();

    useEffect(() => {
        // Fetch challenge details
        getChallengeById(challengeId)
            .then((data) => setChallenge(data))
            .catch((error) => console.error(error));
    }, [challengeId]);

    useEffect(() => {
        if (challenge && challenge.groupId) {
            getGroupById(challenge.groupId)
                .then((data) => {
                    setGroup(data);
                    if (currentUser.id === data.leadUserProfileId) {
                        setIsLeader(true);
                    }
                    const isUserMember = data.members.some(
                        (member) => member.userProfileId === currentUser.id
                    );
                    setIsMember(isUserMember);
                })
                .catch((error) => console.error(error));

            getResultsByChallengeId(challengeId)
                .then((data) => {
                    setResults(data);
                    const hasUserResults = data.some(
                        (result) => result.groupUser.userProfileId === currentUser.id
                    );
                    setHasResults(hasUserResults);
                })
                .catch((error) => console.error(error));
        }
    }, [challenge]);

    useEffect(() => {
        if (group.members) {
            const isUserMember = group.members.some(
                (member) => member.userProfileId === currentUser.id
            );
            setIsMember(isUserMember);
        }
    }, [group])

    useEffect(() => {
        const hasUserResults = results.some(
            (result) => result.groupUser.userProfileId === currentUser.id
        );
        setHasResults(hasUserResults);
    }, [results])


    //extract function to its own component
    const renderChallengeDetails = () => {
        if (!challenge) {
            return <p>Loading challenge details...</p>;
        }

        const currentDate = new Date();
        const isBeforeEndDate = currentDate < new Date(challenge.endDateTime);
        const handleJoinClick = () => {
            if (isMember) {
                Navigate(`/challenge/${challengeId}/join`);
            }
            else {
                //just in case a non-member sees the button
                Navigate(`/group/${group.id}`)
            }
        }

        return (
            <div>
                <h2>{challenge.title}</h2>
                {isBeforeEndDate && isLeader && (
                    <Link to={`/challenge/${challengeId}/edit`}>Edit</Link>
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
                {isBeforeEndDate && isMember && !hasResults && <button onClick={handleJoinClick}>Join Challenge</button>}
                <h3>{isBeforeEndDate ? 'Member Progress' : 'Member Results'}</h3>
                {challenge && results.map((result) => (
                    <MemberResultCard key={result.id} result={result} currentUser={currentUser} isBeforeEndDate={isBeforeEndDate} />
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
