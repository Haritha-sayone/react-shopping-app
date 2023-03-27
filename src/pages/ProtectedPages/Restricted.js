import { Link, useNavigate } from "react-router-dom";

const Restricted = () => {
    const navigate = useNavigate();
    return <div className="container" style={{ marginTop: "78px" }}>
        <div style={{ textAlign: "center", marginTop: "70px" }}>
            <h3 style={{ fontWeight: "600", margin: "30px" }}>Access Restricted!</h3>
            <p>You don't have permission to access this page.</p>
            <Link onClick={() => navigate(-2)}>Go Back</Link>
        </div>
    </div>
};

export default Restricted;