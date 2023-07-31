import React, { useState, useEffect } from 'react';
import ChallengeForm from './challenges/ChallengeForm';
import { createChallenge } from '../modules/challengeManager';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserFromLocalStorage } from '../modules/userProfileManager';
import { getMyGroups } from '../modules/groupManager';

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

    useEffect(() => {
        getMyGroups(currentUser.id).then((groups) => {
            setGroupOptions(groups)
        })
    }, [])

    const handleTitleChange = (title) => {
        setChallenge((prevChallenge) => ({ ...prevChallenge, title }));
    };

    const handleDescriptionChange = (description) => {
        setChallenge((prevChallenge) => ({ ...prevChallenge, description }));
    };

    const handleEndDateChange = (endDate) => {
        setChallenge((prevChallenge) => ({ ...prevChallenge, EndDateTime: endDate }));
    };

    const handleGroupChange = (groupId) => {
        setChallenge((prevChallenge) => ({ ...prevChallenge, groupId }));
    };

    const handleSubmit = () => {
        createChallenge(challenge)
            .then((newChallenge) => {
                // Navigate to the group details page for the associated group using the newChallenge data
                // You can use the newChallenge.groupId to construct the URL
                Navigate(`/challenge/${newChallenge.id}`);
            })
            .catch((error) => {
                console.error('Error creating the challenge:', error.message);
            });
    };

    return (
        <div>
            <h2>Create a Challenge</h2>
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
