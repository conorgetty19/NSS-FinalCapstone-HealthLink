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

export const getGroupUserByBothIds = (groupId, userId) => {
    return getToken().then((token) => {
        return fetch(`${baseAPIUrl}/GetGroupUserByBothIds/${groupId}/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to retrieve the groupUser.");
            }
        });
    });
};

export const getCurrentUserFromLocalStorage = () => {
    const localHealthLinkUser = localStorage.getItem("healthlink_user");
    const HealthLinkUserObject = JSON.parse(localHealthLinkUser);
    return HealthLinkUserObject;
}