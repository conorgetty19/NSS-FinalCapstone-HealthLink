import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
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

    // Styles
    const pageStyle = {
        margin: "15px"
    }
    const contentStyle = {
        marginLeft: "1rem",
        width: "40%"
    }

    // Fetch challenge details on page load
    useEffect(() => {
        // Fetch challenge details
        getChallengeById(challengeId)
            .then((data) => setChallenge(data))
            .catch((error) => console.error(error));
    }, [challengeId]);

    // Fetch group details and challenge results
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

    // Check if the user is a member of the group
    useEffect(() => {
        if (group.members) {
            const isUserMember = group.members.some(
                (member) => member.userProfileId === currentUser.id
            );
            setIsMember(isUserMember);
        }
    }, [group])

    // Check if the user has submitted results
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

        // Check if challenge is still ongoing
        const currentDate = new Date();
        const isBeforeEndDate = currentDate < new Date(challenge.endDateTime);
        const handleJoinClick = () => {
            if (isMember) {
                Navigate(`/challenge/${challengeId}/join`);
            }
            else {
                /// Redirect to group page for non-members
                //in case a non-member sees button
                Navigate(`/group/${group.id}`)
            }
        }

        return (
            <div className='d-flex'>
                <div style={contentStyle}>
                    <p className='h5'>{challenge.description}</p>
                    <div>
                        <p className='h6'>Start Date: {new Date(challenge.createdDateTime).toLocaleString()}</p>
                        <p className='h6'>End Date: {new Date(challenge.endDateTime).toLocaleString()}</p>
                    </div>
                    {group && (
                        <p>
                            Associated Group:{' '}
                            <Link to={`/group/${group.id}`}>{group.title}</Link>
                        </p>
                    )}
                    {isBeforeEndDate && isMember && !hasResults &&
                        <Button color="primary"
                            onClick={handleJoinClick}
                            style={{ marginRight: "1rem" }}>Join Challenge</Button>}
                    {isBeforeEndDate && isLeader && (
                        <Button color="primary" onClick={() => { Navigate(`/challenge/${challengeId}/edit`) }}>Edit Challenge</Button>
                    )}
                </div>
                <div style={{ marginLeft: "5rem", marginTop: "3rem" }}>
                    <h3 className="mt-3">{isBeforeEndDate ? 'Member Progress' : 'Member Results'}</h3>
                    <div className="d-flex flex-wrap">
                        {challenge && results.map((result) => (
                            <MemberResultCard key={result.id} result={result} currentUser={currentUser} isBeforeEndDate={isBeforeEndDate} />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={pageStyle}>
            <h1 className='h2'>{challenge.title} Details</h1>
            {renderChallengeDetails()}
        </div>
    );
};
