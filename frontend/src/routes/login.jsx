import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';


function extractUserRole(accessToken) {
    const decodedToken = jwt_decode(accessToken);
    const role = decodedToken.roles;
    return role;
}

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();


    function handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Login failed");
                }
            })
            .then((data) => {
                if (data.access_token) {
                    const role = extractUserRole(data.access_token);
                    setAccessToken(data.access_token);
                    setRole(role);
                    console.log('ROLE ' +role)
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

    return (
        <div>
            <h1>Login</h1>
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
                {errorMessage && <div>{errorMessage}</div>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;
