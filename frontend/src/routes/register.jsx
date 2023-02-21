import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';


function extractUserRole(accessToken) {
    const decodedToken = jwt_decode(accessToken);
    const role = decodedToken.roles;
    return role;
}

function Registration() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [nameFirst, setNameFirst] = useState("");
    const [nameLast, setNameLast] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();


    function handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:3000/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, email, nameLast, nameFirst }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Registration failed");
                }
            })
            .then((data) => {
                console.log('data' + JSON.stringify(data))
                if (data.accessToken) {
                    const role = extractUserRole(data.accessToken);
                    setAccessToken(data.accessToken);
                    setRole(role);
                    navigate("/loggedIn", { state: { username, role } });
                }
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    }


    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handleFirstNameChange(event) {
        setNameFirst(event.target.value);
    }

    function handleLastNameChange(event) {
        setNameLast(event.target.value);
    }


    return (
        <div>
            <h1>Register form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <label htmlFor="firstName">First name:</label>
                    <input
                        type="firstName"
                        id="firstName"
                        value={nameFirst}
                        onChange={handleFirstNameChange}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last name:</label>
                    <input
                        type="lastName"
                        id="lastName"
                        value={nameLast}
                        onChange={handleLastNameChange}
                    />
                </div>
                {errorMessage && <div>{errorMessage}</div>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Registration;
