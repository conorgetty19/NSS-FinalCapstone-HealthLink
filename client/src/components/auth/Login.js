import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login, setLocalUserId } from "../../modules/authManager";

export default function Login() {
    const navigate = useNavigate();

    // Styles for page elements
    const pageStyle = {
        width: "300px",
        margin: "auto",
        marginTop: "40px",
        boxShadow: "0 10px 15px rgba(179, 179, 179, 0.7)",
        padding: "15px"
    }
    const titleStyle = {
        fontSize: "25px"
    }

    const subtextStyle = {
        fontSize: "12px",
        margin: "12px",
        marginLeft: "0px"
    }

    // State variables for form inputs
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // Login form submission handler
    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password).then(() => setLocalUserId(email))
            .then(() => navigate("/"))
            .catch(() => alert("Invalid email or password"));
    };

    return (
        <Form style={pageStyle} onSubmit={loginSubmit}>
            <h1 style={titleStyle}>Sign in</h1>
            <h3 style={subtextStyle}>Stay fit with your friends</h3>
            <fieldset>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        id="email"
                        type="text"
                        autoFocus
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
                    <Button color="primary">Login</Button>
                </FormGroup>
                <em>
                    <Link to="/register">Not registered?</Link>
                </em>
            </fieldset>
        </Form>
    );
}