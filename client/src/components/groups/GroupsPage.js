import { useState, useEffect } from "react"
import { getAllActiveGroups } from "../../modules/groupManager"
import GroupList from "./GroupList";

export default function GroupsPage() {
    const [groups, setGroups] = useState([])

    useEffect(() => {
        getAllActiveGroups().then(setGroups)
    }, []);

    const pageStyle = {
        margin: "15px"
    }

    return (
        <div style={pageStyle}>
            <h1>All Groups</h1>
            <GroupList GroupList={groups} />
        </div>
    )
}