import React, {useState} from "react";
import  { useNavigate} from "react-router-dom";

function CreateArticle() {
    const [header, setHeader] = useState("");
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:3000/articles/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ header, content }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("error");
                }
            })
            .then((data) => {
                if (data.access_token) {
                    navigate("/loggedIn", { state: { header } });
                }
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    }

    function handleHeaderChange(event) {
        setHeader(event.target.value);
    }

    function handleContentChange(event) {
        setContent(event.target.value);
    }

    return (
        <div>
            <h1>Create Article</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="header">Header:</label>
                    <input
                        type="text"
                        id="header"
                        value={header}
                        onChange={handleHeaderChange}
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <input
                        type="content"
                        id="content"
                        value={content}
                        onChange={handleContentChange}
                    />
                </div>
                {errorMessage && <div>{errorMessage}</div>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateArticle;
