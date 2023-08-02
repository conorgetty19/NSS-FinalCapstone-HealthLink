import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle, CardSubtitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

export default function Group({ group }) {
    const cardStyle = {
        maxWidth: "300px", // Set the maximum width of the card
        margin: "auto", // Center the card horizontally (optional)
        marginTop: "10px",
        marginBottom: "10px",
        padding: "10px",
        boxShadow: "0 10px 15px rgba(110, 110, 110, 1)",
        backgroundColor: "rgb(175, 181, 189)"
    };

    const nameStyle = {
        marginRight: "10px"
    }

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
                <div className="d-flex h5">
                    <CardText style={nameStyle}>Name:</CardText>
                    <Link to={`/group/${group.id}`}>
                        <CardTitle>{group.title}</CardTitle>
                    </Link>
                </div>
                <CardText className="h7">Description: {group.description}</CardText>
                <Row>
                    <Col xs="4"> {/* Adjust the column size to your preference */}
                        <CardImg
                            src={group.leadUserProfile?.imageUrl || defaultImageUrl}
                            alt="Leader Image"
                            className="img-fluid"
                        />
                    </Col>
                    <Col>
                        <CardSubtitle className="h7">Leader: {group.leadUserProfile?.username || "no current leader"}</CardSubtitle>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}
