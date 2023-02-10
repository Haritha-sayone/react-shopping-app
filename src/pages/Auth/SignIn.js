import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="container-fluid" style={{ marginTop: "78px" }}>
      <div className="row my-5">
        <h4 className="text-center mt-5">Login</h4>
        <div className="col-4"></div>
        <div className="col-4">
          <div className="alert alert-danger" role="alert">
            Invalid email or password.
          </div>
          <form autoComplete="off">
            <div className="mb-3">
              <label htmlFor="e-mail" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="e-mail"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pwd" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="pwd"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">LogIn</button>
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
};

export default SignIn;
