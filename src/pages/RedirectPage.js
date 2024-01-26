import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Use this page for auto logout
function RedirectPage() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        navigate("/signin");
    }, []);

}

export default RedirectPage;