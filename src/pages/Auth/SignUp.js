import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import Loader from "../../components/Loader/Loader";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const registerUser = event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            toast.error("Failed to create account.");
            return;
        };
        setError("");
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password).then(cred => {
            // sendEmailVerification(cred.user);
            // toast.info("An email has been sent to your email id. Please verify your email.");
            const docRef = doc(db, "users", cred.user.uid);
            setDoc(docRef, {
                username,
                email,
                password,
                id: cred.user.uid
            });
            setIsLoading(false);
            toast.success("Success! Account created.");
            navigate("/login");
        }).catch(error => {
            setIsLoading(false);
            if (error.code === "auth/email-already-in-use") {
                setError("This email id already exists.");
                toast.error("Failed to create account.");
            }
            else if (error.code === "auth/weak-password") {
                setError("Please enter a strong password.");
                toast.error("Failed to create account.");
            }
            else if (error.code === "auth/network-request-failed") {
                setError("Oops! Poor internet connectivity.");
                toast.error("Failed to create account.");
            }
            else {
                toast.error(`Error! ${error.code}`);
            }
        });
    };

    return (
        <>
            {isLoading && !error && <Loader />}
            {
                !isLoading && (
                    <div className="container-fluid" style={{ marginTop: "78px" }}>
                        <div className="row my-5">
                            <h4 className="text-center mt-5">Sign Up</h4>
                            <div className="col-4"></div>
                            <div className="col-4">
                                {
                                    error && (
                                        <div className="alert alert-danger" role="alert">
                                            {error}
                                        </div>
                                    )
                                }
                                <form onSubmit={registerUser} autoComplete="off">
                                    <div className="mb-3">
                                        <label htmlFor="user-name" className="form-label">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="user-name"
                                            aria-describedby="emailHelp"
                                            required
                                            value={username}
                                            onChange={event => setUsername(event.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="e-mail" className="form-label">
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="e-mail"
                                            aria-describedby="emailHelp"
                                            required
                                            value={email}
                                            onChange={event => setEmail(event.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pwd" className="form-label">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="pwd"
                                            required
                                            value={password}
                                            onChange={event => setPassword(event.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="c-pwd" className="form-label">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="c-pwd"
                                            required
                                            value={confirmPassword}
                                            onChange={event => setConfirmPassword(event.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Create Account
                                    </button>
                                    <hr />
                                    <div className="mt-3 mb-3">
                                        Already have an account ? <Link to="/login">Login</Link>
                                    </div>
                                </form>
                            </div>
                            <div className="col-4"></div>
                        </div>
                    </div>
                )
            }
        </>
    )
};

export default SignUp;
