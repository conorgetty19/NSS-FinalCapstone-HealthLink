import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const MemberResultCard = ({ result }) => {
    return (
        <Card>
            <CardBody>
                <CardTitle>{result.groupUser.userProfile.username}</CardTitle>
                <CardText>{result.content}</CardText>
                <CardText>{new Date(result.updateDateTime).toLocaleString()}</CardText>
            </CardBody>
        </Card>
    );
};

export default MemberResultCard;
