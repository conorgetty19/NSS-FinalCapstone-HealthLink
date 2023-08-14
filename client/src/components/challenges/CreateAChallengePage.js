import React, { useState, useEffect } from 'react';
import ChallengeForm from './ChallengeForm';
import { createChallenge } from '../../modules/challengeManager';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserFromLocalStorage } from '../../modules/userProfileManager';
import { getMyGroups } from '../../modules/groupManager';

const CreateAChallengePage = () => {
    const [challenge, setChallenge] = useState({
        title: '',
        description: '',
        EndDateTime: '',
        groupId: '',
    });
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


    //refactor these change handlers to be one utility function
    const handleTitleChange = (title) => {
        // Update the challenge title in the state
        setChallenge((prevChallenge) => ({ ...prevChallenge, title }));
    };

    const handleDescriptionChange = (description) => {
        // Update the challenge description in the state
        setChallenge((prevChallenge) => ({ ...prevChallenge, description }));
    };

    const handleEndDateChange = (endDate) => {
        // Update the challenge end date in the state
        setChallenge((prevChallenge) => ({ ...prevChallenge, EndDateTime: endDate }));
    };

    const handleGroupChange = (groupId) => {
        // Update the selected group ID in the state
        setChallenge((prevChallenge) => ({ ...prevChallenge, groupId }));
    };

    const handleSubmit = () => {
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
                challenge={challenge}
                groups={groupOptions}
                onTitleChange={handleTitleChange}
                onDescriptionChange={handleDescriptionChange}
                onEndDateChange={handleEndDateChange}
                onGroupChange={handleGroupChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default CreateAChallengePage;
