import { getToken } from "./authManager";

const baseAPIUrl = "/api/group"

export const getMyGroups = (userId) => {
    return getToken().then((token) => {
        return fetch(baseAPIUrl + `/GetByUserId/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error("An unknown error occurred while trying to retrieve your groups.",)
            }
        })
    })
}

export const getAllActiveGroups = () => {
    return getToken().then((token) => {
        return fetch(baseAPIUrl + `/GetAllActive`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error("An unknown error occurred while trying to retrieve all active groups.",)
            }
        })
    })
}

export const createGroup = (group) => {
    return getToken().then((token) => {
        return fetch(baseAPIUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(group),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while creating the group.");
            }
        });
    });
};