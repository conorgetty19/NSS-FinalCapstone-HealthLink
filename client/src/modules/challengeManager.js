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