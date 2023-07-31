import { getToken } from "./authManager";

const baseAPIUrl = "/api/challenge"

export const getChallengeById = (challengeId) => {
    return getToken().then((token) => {
        return fetch(`${baseAPIUrl}/${challengeId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to retrieve the challenge.");
            }
        });
    });
};

export const createChallenge = (challenge) => {
    return getToken().then((token) => {
        return fetch(baseAPIUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(challenge),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while creating the challenge.");
            }
        });
    });
};

export const updateChallenge = (challenge) => {
    return fetch(`${baseAPIUrl}/${challenge.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(challenge),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Error updating challenge:", error);
            throw error;
        });
};