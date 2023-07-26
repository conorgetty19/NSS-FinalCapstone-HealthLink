import { useState, useEffect } from "react"
import { getAllActiveGroups } from "../modules/groupManager"
import GroupList from "./groups/GroupList";

export default function GroupsPage() {
    const [groups, setGroups] = useState([])

    useEffect(() => {
        getAllActiveGroups().then(setGroups)
    }, []);

    return (
        <>
            <h1>All Groups</h1>
            <GroupList GroupList={groups} />
        </>
    )
}