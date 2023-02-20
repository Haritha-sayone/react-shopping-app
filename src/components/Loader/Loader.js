import ReactDOM from "react-dom";

const Loader = () => {
    return ReactDOM.createPortal(
        <div
            className="spinner-border text-primary text-center"
            role="status"
            style={{
                width: "3rem",
                height: "3rem",
                position: "fixed",
                top: "50%",
                left: "50%"
            }}
        >
            <span className="visually-hidden">Loading...</span>
        </div>,
        document.getElementById("loader")
    );
};

export default Loader;
