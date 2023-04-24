import { Link } from "react-router-dom";

const PageNotFound = () => {
    return <div className="container" style={{ marginTop: "78px" }}>
        <div style={{ textAlign: "center", marginTop: "70px" }}>
            <h3 style={{ fontWeight: "600", margin: "30px" }}>404 Page Not Found!</h3>
            <Link to={-1}>Go Back</Link>
        </div>
    </div>
};

export default PageNotFound;