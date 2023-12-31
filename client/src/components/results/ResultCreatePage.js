import React, { useEffect, useState } from 'react';
import ResultForm from './ResultForm';
import { createResult } from '../../modules/resultManager';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentUserFromLocalStorage } from '../../modules/userProfileManager';
import { getChallengeById } from '../../modules/challengeManager';
import { getGroupUserByBothIds } from '../../modules/userProfileManager';
import { Button } from 'reactstrap'

export default function ResultCreatePage() {
    const { challengeId } = useParams();
    const [content, setContent] = useState('');
    const [groupUserId, setGroupUserId] = useState(0);
    const currentUserId = getCurrentUserFromLocalStorage().id;

    const navigate = useNavigate();

    const pageStyle = {
        margin: "15px"
    }

    //fetch associated challenge data and matching groupUserId (based on challengeId and current user Id)
    useEffect(() => {
        // Fetch the groupId and groupUserId using the API function
        getChallengeById(challengeId)
            .then((challenge) => {
                // Once the challenge is retrieved, fetch the groupUser
                getGroupUserByBothIds(challenge.groupId, currentUserId)
                    .then((groupUser) => {
                        // Set the groupUserId state based on the retrieved groupUser
                        if (groupUser) {
                            setGroupUserId(groupUser.id);
                        } else {
                            // If the groupUser is not found, handle it
                        }
                    })
            })
    }, [challengeId, currentUserId]);

    const handleContentChange = (value) => {
        setContent(value);
    };

    const handleCreateResult = () => {
        const newResult = {
            challengeId: challengeId,
            groupUserId: groupUserId,
            content: content,
        };
        createResult(newResult)
            .then(() => {
                navigate(`/challenge/${challengeId}`);
            })
            .catch((error) => {
                console.error('Error creating the result:', error.message);
            });
    };

    return (
        <div style={pageStyle}>
            <h2>Create Result</h2>
            <ResultForm result={{ challengeId, groupUserId, content }} onContentChange={handleContentChange} />
            <Button onClick={handleCreateResult} color="primary">Save</Button>
        </div>
    );
};
