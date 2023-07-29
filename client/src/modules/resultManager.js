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