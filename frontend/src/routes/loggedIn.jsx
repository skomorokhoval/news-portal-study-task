import React from "react";
import {Link, useLocation} from "react-router-dom";

function LoggedIn() {
    const {state} = useLocation();
    console.log("state: " +JSON.stringify(state))
    const {username, role} = state || {};

    return (
        <>
            <h1>Hello, {username}</h1>
            {role === "admin" && (
                <div>
                    <Link to="/createArticle">
                        <button>Create an Article</button>
                    </Link>
                </div>
            )}
        </>
    );
}

export default LoggedIn;
