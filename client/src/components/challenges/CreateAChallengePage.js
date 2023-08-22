import React, { useState, useEffect } from 'react';
import ChallengeForm from './ChallengeForm';
import { createChallenge } from '../../modules/challengeManager';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserFromLocalStorage } from '../../modules/userProfileManager';
import { getMyGroups } from '../../modules/groupManager';

export default function CreateAChallengePage() {
    const [groupOptions, setGroupOptions] = useState([]);
    const currentUser = getCurrentUserFromLocalStorage();
    const Navigate = useNavigate();
    const pageStyle = {
        margin: "15px"
    }

    // Fetch the user's groups and populate the group options for the challenge
    useEffect(() => {
        getMyGroups(currentUser.id).then((groups) => {
            setGroupOptions(groups)
        })
    }, [])


    const handleSubmit = (challenge) => {
        // Create a new challenge using the provided data
        createChallenge(challenge)
            .then((newChallenge) => {
                // Navigate to the group details page for the associated group using the newChallenge data
                Navigate(`/challenge/${newChallenge.id}`);
            })
            .catch((error) => {
                console.error('Error creating the challenge:', error.message);
            });
    };

    return (
        <div style={pageStyle}>
            <h1>Create a Challenge</h1>
            <ChallengeForm
                challenge={null}
                groups={groupOptions}
                onSubmit={handleSubmit}
            />
        </div>
    );
};
