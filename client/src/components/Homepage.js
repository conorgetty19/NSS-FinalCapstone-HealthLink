import { useState, useEffect } from "react"
import { getMyGroups } from "../modules/groupManager"
import GroupList from "./groups/GroupList";

export default function MyGroupsList() {
    const [groups, setGroups] = useState([])
    const localHealthLinkUser = localStorage.getItem("healthlink_user")
    const healthLinkUserObject = JSON.parse(localHealthLinkUser)

    useEffect(() => {
        getMyGroups(healthLinkUserObject.id).then(setGroups)
    }, []);

    const pageStyle = {
        margin: "15px"
    }

    return (
        <div style={pageStyle}>
            <h1>My Groups</h1>
            <GroupList GroupList={groups} />
        </div>
    )
}