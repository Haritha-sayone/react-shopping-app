import { Link } from "react-router-dom";

const Restricted = () => {
    return <div className="container" style={{ marginTop: "78px" }}>
        <div style={{ textAlign: "center", marginTop: "70px" }}>
            <h3 style={{ fontWeight: "600", margin: "30px" }}>Access Restricted!</h3>
            <p>You don't have permission to access this page.</p>
            <Link to={-2}>Go Back</Link>
        </div>
    </div>
};

export default Restricted;