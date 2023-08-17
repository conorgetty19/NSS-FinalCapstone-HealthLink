import { Card, CardImg, CardBody, CardTitle } from "reactstrap";

export default function GroupMemberCard({ member }) {
    const defaultImageUrl =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png";

    return (
        <Card className="m-2" style={{ width: "18rem" }}>
            <CardImg
                top
                width="100%"
                src={member.userProfile.imageUrl || defaultImageUrl}
                alt={member.userProfile.username}
                style={{ width: "20%", height: "auto", marginRight: "10px", marginLeft: "4px", marginTop: "4px" }}
            />
            <CardBody>
                <CardTitle tag="h5">{member.userProfile.username}</CardTitle>
            </CardBody>
        </Card>
    )
}