import React from "react";

function LoggedIn(props) {
    const { username } = props.location.state || {};

    return <h1>Hello {username}</h1>;
}

export default LoggedIn;
