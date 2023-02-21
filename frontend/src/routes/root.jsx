import { Link } from 'react-router-dom';

export default function Root() {
    return (
        <>
            <div id="sidebar">
                <h1>Main</h1>
                <div>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                    <Link to="/register">
                        <button>Registration</button>
                    </Link>
                </div>
            </div>
        </>
    );
}
