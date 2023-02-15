import  { Component } from "react";

class LoggedInPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: null
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        this.setState({ token });
    }

    render() {
        const { token } = this.state;
        return (
            <div>
                <h1>Logged In</h1>
                {token && <p>Token: {token}</p>}
            </div>
        );
    }
}

export default LoggedInPage;
