import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { deleteResult } from '../../modules/resultManager';
import { useNavigate } from 'react-router-dom';

const MemberResultCard = ({ result, currentUser, isBeforeEndDate }) => {
    const navigate = useNavigate();
    const handleEditClick = () => { navigate(`/challenge/result/${result.id}`) }
    const handleDeleteClick = () => {
        deleteResult(result.id).then(() => {
            window.location.reload();
        })
    }
    return (
        <Card>
            <CardBody>
                <CardTitle>{result.groupUser.userProfile.username}</CardTitle>
                <CardText>{result.content}</CardText>
                <CardText>{new Date(result.updateDateTime).toLocaleString()}</CardText>
                {currentUser.id === result.groupUser.userProfileId && (
                    <>
                        {isBeforeEndDate && <Button color="primary" onClick={handleEditClick}>Edit</Button>}
                        <Button onClick={handleDeleteClick} color="secondary">Delete</Button>
                    </>
                )}
            </CardBody>
        </Card>
    );
};

export default MemberResultCard;
