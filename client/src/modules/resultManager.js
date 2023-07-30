import { getToken } from "./authManager"

const baseAPIUrl = "/api/result"

export const getResultsByChallengeId = (challengeId) => {
    return getToken().then((token) => {
        return fetch(baseAPIUrl + `/GetByChallengeId/${challengeId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error("An unknown error occurred while trying to retrieve results.",)
            }
        })
    })
}

export const getResultById = (resultId) => {
    return getToken().then((token) => {
        return fetch(`${baseAPIUrl}/${resultId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to retrieve the result.");
            }
        });
    });
};

export const createResult = (result) => {
    return getToken().then((token) => {
        return fetch(baseAPIUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(result),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while creating the result.");
            }
        });
    });
};

export const updateResult = (result) => {
    return getToken().then((token) => {
        return fetch(baseAPIUrl + `/${result.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(result),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while updating the result.");
            }
        });
    });
};


export const deleteResult = (id) => {
    return getToken().then((token) => {
        return fetch(baseAPIUrl + `/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
    });
};