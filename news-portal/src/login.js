import  { Component } from "react";
import LoggedInPage from "./loggedInPage";

class LoginPage extends Component {
    state = {
        username: "",
        password: "",
        error: null,
        loggedIn: false,
    };

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    };

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };

    handleLogin = async (event) => {
        event.preventDefault();
        this.setState({ error: null });

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                }),
            });

            if (!response.ok) {
                throw new Error(JSON.stringify(this.state));
            }

            const { access_token } = await response.json();
            console.log(access_token);
            localStorage.setItem("token", access_token);
            this.setState({ loggedIn: true });
        } catch (error) {
            this.setState({ error: error.message });
        }
    };

    render() {
        const { loggedIn } = this.state;

        if (loggedIn) {
            return <LoggedInPage />;
        }

        return (
            <div className="LoginPage" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <form style={{ display: "flex", flexDirection: "column", width: "300px" }} onSubmit={this.handleLogin}>
                    <h1 style={{ textAlign: "center" }}>Login</h1>
                    {this.state.error && <p className="error">{this.state.error}</p>}
                    <div>
                        <label htmlFor="username">Login:</label>
                        <input
                            type="text"
                            id="username"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                    </div>
                    <button type="submit" style={{ marginTop: "10px" }}>
                        Login
                    </button>
                </form>
            </div>
        );
    }
}

export default LoginPage;
