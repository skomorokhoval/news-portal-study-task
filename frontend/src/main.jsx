import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Login from "./routes/login";
import LoggedIn from "./routes/loggedIn";
import CreateArticle from "./routes/createArticle";
import Registration from "./routes/register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/loggedIn",
        element: <LoggedIn />,
    },
    {
        path: "/register",
        element: <Registration />,
    },
    {
        path: "/createArticle",
        element: <CreateArticle />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
