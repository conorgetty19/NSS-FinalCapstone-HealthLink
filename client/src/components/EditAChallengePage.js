import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChallengeForm from './challenges/ChallengeForm';
import { getChallengeById, updateChallenge } from '../modules/challengeManager';
import { getGroupById } from '../modules/groupManager';

const EditChallengePage = () => {
    const { challengeId } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [groupOption, setGroupOption] = useState(null);
    const Navigate = useNavigate();

    useEffect(() => {
        // Fetch the challenge data from the API based on the challenge ID
        getChallengeById(challengeId)
            .then((fetchedChallenge) => {
                setChallenge({
                    ...fetchedChallenge,
                    // Convert the endDate to the format expected by datetime-local input
                    endDateTime: fetchedChallenge.endDateTime.slice(0, 16),
                });
                getGroupById(fetchedChallenge.groupId).then((group) => {
                    setGroupOption(group);
                });
            })
            .catch((error) => {
                console.error('Error fetching challenge data:', error);
            });
    }, [challengeId]);

    const handleTitleChange = (title) => {
        setChallenge((prevChallenge) => ({ ...prevChallenge, title }));
    };

    const handleDescriptionChange = (description) => {
        setChallenge((prevChallenge) => ({ ...prevChallenge, description }));
    };

    const handleEndDateChange = (endDate) => {
        setChallenge((prevChallenge) => ({ ...prevChallenge, endDateTime: endDate }));
    };

    const handleSubmit = () => {
        // Submit the updated challenge data to the API
        updateChallenge(challenge)
            .then((updatedChallenge) => {
                Navigate(`/challenge/${challengeId}`);
            })
            .catch((error) => {
                console.error('Error updating challenge:', error);
            });
    };

    if (!challenge || !groupOption) {
        // You can render a loading indicator here while waiting for the challenge data to load
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Challenge</h2>
            <ChallengeForm
                challenge={challenge}
                groups={[groupOption]}
                onTitleChange={handleTitleChange}
                onDescriptionChange={handleDescriptionChange}
                onEndDateChange={handleEndDateChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default EditChallengePage;
