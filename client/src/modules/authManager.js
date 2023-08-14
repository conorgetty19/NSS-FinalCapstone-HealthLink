import firebase from "firebase/app";
import "firebase/auth";

const _apiUrl = "/api/userprofile";

// Check if a user with the provided Firebase user ID exists in the app's database
const _doesUserExist = (firebaseUserId) => {
    return getToken().then((token) =>
        fetch(`${_apiUrl}/DoesUserExist/${firebaseUserId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.ok));
};

// Save a user profile in the app's database
const _saveUser = (userProfile) => {
    return getToken().then((token) =>
        fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userProfile)
        }).then(resp => resp.json()));
};


// Get the authentication token of the current user
export const getToken = () => firebase.auth().currentUser.getIdToken();

// Log in a user using email and password
export const login = (email, pw) => {
    return firebase.auth().signInWithEmailAndPassword(email, pw)
        .then((signInResponse) => _doesUserExist(signInResponse.user.uid))
        .then((doesUserExist) => {
            if (!doesUserExist) {

                // If we couldn't find the user in our app's database, we should logout of firebase
                logout();

                throw new Error("Something's wrong. The user exists in firebase, but not in the application database.");
            }
        }).catch(err => {
            console.error(err);
            throw err;
        });
};


export const logout = () => {
    firebase.auth().signOut()
};

// Register a new user with a user profile and password
export const register = (userProfile, password) => {
    return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
        .then((createResponse) => _saveUser({
            ...userProfile,
            firebaseUserId: createResponse.user.uid
        }));
};

// Listen for changes in login status and execute a handler
export const onLoginStatusChange = (onLoginStatusChangeHandler) => {
    firebase.auth().onAuthStateChanged((user) => {
        onLoginStatusChangeHandler(!!user);
    });
};

// Set the local user ID in the browser's local storage based on the email
//refactor to use a search by firebaseId instead of email
export const setLocalUserId = (email) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/userSearch/${email}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
                    .then(userProfile => {
                        localStorage.setItem("healthlink_user", JSON.stringify({
                            id: userProfile.id
                        }))
                    })
            } else {
                throw new Error(`Failed to get user with email ${email}`)
            }
        })
    })
}