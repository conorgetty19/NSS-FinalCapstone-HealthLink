import { getToken } from "./authManager"

const baseAPIUrl = "/api/userprofile"

export const addGroupUser = (groupUser) => {
    return getToken().then((token) => {
        return fetch(`${baseAPIUrl}/groupuser`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(groupUser),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while adding the user to the group.");
            }
        });
    });
};