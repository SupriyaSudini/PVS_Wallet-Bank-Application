import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PublicRoute(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate]); // Include navigate in the dependency array to remove the eslint warning

    return (
        <div>
            {props.children}
        </div>
    );
}

export default PublicRoute;
