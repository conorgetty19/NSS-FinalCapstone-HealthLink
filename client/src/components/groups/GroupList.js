import { Row } from "reactstrap";
import Group from "./Group";

export default function GroupList({ GroupList }) {

    return (
        <Row>
            {GroupList.map((group) => (
                <Group key={group.id} group={group} />
            ))}
        </Row>
    )
}