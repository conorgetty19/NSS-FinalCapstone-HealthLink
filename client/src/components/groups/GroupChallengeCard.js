import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";

export default function GroupChallengeCard({ challenge }) {

    return (
        <Card className="m-2" style={{ width: "18rem" }}>
            <CardBody>
                <Link to={`/challenge/${challenge.id}`}>
                    <CardTitle tag="h5">{challenge.title}</CardTitle>
                </Link>
                <CardText>{challenge.description}</CardText>
            </CardBody>
        </Card>
    )
}