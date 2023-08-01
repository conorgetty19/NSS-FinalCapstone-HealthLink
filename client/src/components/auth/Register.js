import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../../modules/authManager";

export default function Register() {
    const navigate = useNavigate();
    const pageStyle = {
        width: "600px",
        margin: "auto",
        marginTop: "40px",
        boxShadow: "0 10px 15px rgba(179, 179, 179, 0.7)",
        padding: "15px"
    }
    const titleStyle = {
        fontSize: "25px"
    }
    const columnStyle = {
        margin: "auto"
    }

    const buttonStyle = {
        marginTop: "31px"
    }

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
        <Form style={pageStyle} onSubmit={registerClick}>
            <h1 style={titleStyle}>Register</h1>
            <fieldset className="d-flex">
                <div className="d-flex flex-column" style={columnStyle}>
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
                        <Label htmlFor="username">User Name</Label>
                        <Input
                            id="username"
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
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
                </div>
                <div className="d-flex flex-column" style={columnStyle}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
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
                    <FormGroup style={buttonStyle}>
                        <Button color="primary">Register</Button>
                    </FormGroup>
                </div>
            </fieldset>
        </Form>
    );
}
