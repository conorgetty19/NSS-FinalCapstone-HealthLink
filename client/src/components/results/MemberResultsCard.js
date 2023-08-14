import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { deleteResult } from '../../modules/resultManager';
import { useNavigate } from 'react-router-dom';

export default function MemberResultCard({ result, currentUser, isBeforeEndDate }) {
    const navigate = useNavigate();
    const handleEditClick = () => { navigate(`/challenge/result/${result.id}`) }
    const handleDeleteClick = () => {
        deleteResult(result.id).then(() => {
            window.location.reload();
        })
    }
    const cardStyle = {
        width: "14rem",
        margin: "5px"
    }
    const buttonStyle = {
        marginRight: "5px",
        marginLeft: "5px"
    }
    return (
        <Card style={cardStyle}>
            <CardBody>
                <CardTitle className='h4'>{result.groupUser.userProfile.username}</CardTitle>
                <CardText className='h6'>{result.content}</CardText>
                <CardText>{new Date(result.updateDateTime).toLocaleString()}</CardText>
                {currentUser.id === result.groupUser.userProfileId && (
                    <>
                        {isBeforeEndDate && <Button style={buttonStyle} color="primary" onClick={handleEditClick}>Edit</Button>}
                        <Button style={buttonStyle} onClick={handleDeleteClick} color="secondary">Delete</Button>
                    </>
                )}
            </CardBody>
        </Card>
    );
};
