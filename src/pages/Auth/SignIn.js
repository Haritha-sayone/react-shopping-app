import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Loader from "../../components/Loader/Loader";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = event => {
    event.preventDefault();
    console.log(email, password);
    setError("");
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password).then(cred => {
      const docRef = doc(db, "users", cred.user.uid);
      getDoc(docRef).then(doc => {
        console.log(doc.data());
        dispatch(SET_ACTIVE_USER({
          email: doc.data().email,
          userName: doc.data().username,
          userID: doc.data().id,
          isAdmin: doc.data().isAdmin === true
        }));
        setIsLoading(false);
        toast.success("Login Success.");
        doc.data().isAdmin === true ? navigate("/admin") : navigate("/products");
      });

    }).catch(error => {
      console.log(error);
      setIsLoading(false);
      if (error.code === "auth/user-not-found") {
        setError("Incorrect email id.");
        toast.error("Login failed");
      }
      else if (error.code === "auth/wrong-password") {
        setError("Incorrect password.");
        toast.error("Login failed.");
      }
      else {
        setError(error.code);
        toast.error("Login failed.");
      }
    });
  };

  // Login with google
  const googleLogin = () => {
    setError("");
    setIsLoading(true);
    signInWithPopup(auth, provider).then(result => {
      console.log("result= ", result);
      console.log("userID= ", result.user.uid);
      const docRef = doc(db, "users", result.user.uid);
      getDoc(docRef).then(doc => {
        console.log(doc.data());
        dispatch(SET_ACTIVE_USER({
          email: doc.data().email,
          userName: doc.data().username,
          userID: doc.data().id,
          isAdmin: doc.data().isAdmin === true
        }));
        setIsLoading(false);
        toast.success("Login Success.");
        doc.data().isAdmin === true ? navigate("/admin") : navigate("/products");
      }).catch(error => {
        // signOut(auth).then(() => {
        //   toast.error("Please create an account first");
        //   navigate("/signup");
        // });

        setDoc(doc(db, "users", result.user.uid), {
          id: result.user.uid,
          email: result.user.email,
          username: result.user.displayName
        });
        dispatch(SET_ACTIVE_USER({
          email: result.user.email,
          userName: result.user.displayName,
          userID: result.user.uid,
        }));
        setIsLoading(false);
        toast.success("Login success.");
        navigate("/products");
      });
    }).catch(error => {
      setIsLoading(false);
      if (error.code === "auth/user-not-found") {
        toast.error("Login failed");
      }
      else {
        toast.error("Login failed.");
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
              <h4 className="text-center mt-5">Login</h4>
              <div className="col-4"></div>
              <div className="col-4">
                {
                  error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )
                }
                <form onSubmit={login} autoComplete="off">
                  <div className="mb-3">
                    <label htmlFor="e-mail" className="form-label">Email address</label>
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
                    <label htmlFor="pwd" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="pwd"
                      required
                      value={password}
                      onChange={event => setPassword(event.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">LogIn</button>
                  <p style={{ textAlign: "center", margin: "1rem" }}>-- or --</p>
                  <button className="btn btn-dark" onClick={googleLogin}>
                    <i
                      className="fa fa-google fa-sm"
                      aria-hidden="true"
                      style={{ color: "orangered" }}
                    >
                    </i> Login with google
                  </button>
                  <hr />
                  <div className="mt-3 mb-3">
                    New user ? <Link to="/signup">Create an Account</Link>
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

export default SignIn;
