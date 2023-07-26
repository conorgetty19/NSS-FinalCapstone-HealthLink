import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle, CardSubtitle, Row, Col } from "reactstrap";

export default function Group({ group }) {
    const cardStyle = {
        maxWidth: "300px", // Set the maximum width of the card
        margin: "auto", // Center the card horizontally (optional)
    };

    // Define the default image URL in case the leader image is null
    const defaultImageUrl =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png";

    return (
        <Card style={cardStyle}>
            <CardImg
                top
                width="100%"
                src={group.imageUrl || defaultImageUrl}
                alt="Group Image"
                className="img-fluid"
            />
            <CardBody>
                <CardTitle>{group.title}</CardTitle>
                <CardText>{group.description}</CardText>
                <Row>
                    <Col xs="4"> {/* Adjust the column size to your preference */}
                        <CardImg
                            src={group.leadUserProfile.imageUrl || defaultImageUrl}
                            alt="Leader Image"
                            className="img-fluid"
                        />
                    </Col>
                    <Col>
                        <CardSubtitle>Leader: {group.leadUserProfile.username}</CardSubtitle>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}
