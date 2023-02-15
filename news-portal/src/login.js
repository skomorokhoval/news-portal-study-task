import  { Component } from "react";
import LoggedInPage from "./loggedInPage";

class LoginPage extends Component {
    state = {
        login: "",
        password: "",
        error: null,
        loggedIn: false,
    };

    handleUsernameChange = (event) => {
        this.setState({ login: event.target.value });
    };

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };

    handleLogin = async (event) => {
        event.preventDefault();
        this.setState({ error: null });

        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    login: this.state.login,
                    password: this.state.password,
                }),
            });

            if (!response.ok) {
                console.log(response);
                throw new Error("Login failed");
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
                        <label htmlFor="login">Login:</label>
                        <input
                            type="text"
                            id="login"
                            value={this.state.login}
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
