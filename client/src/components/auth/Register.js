import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../../modules/authManager";

export default function Register() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const fullName = firstName + " " + lastName;
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Try again.");
        } else {
            const userProfile = {
                fullName,
                username,
                imageUrl,
                email,
            };
            register(userProfile, password).then(() => navigate("/"));
        }
    };

    return (
        <Form onSubmit={registerClick}>
            <fieldset>
                <FormGroup>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        id="lastName"
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="username">Display Name</Label>
                    <Input
                        id="username"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        id="email"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="imageUrl">Profile Image URL</Label>
                    <Input
                        id="imageUrl"
                        type="text"
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Button>Register</Button>
                </FormGroup>
            </fieldset>
        </Form>
    );
}
