import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { storeLogin } from "../../redux/action";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const store = (e) => {
    e.preventDefault();

    const form = {
      email,
      password,
    };

    storeLogin(form)
      .then((res) => {
        toast.success(res.message);
        navigate("/dashboard");
        window.location.reload();
      })
      .catch((err) => {
        if (err.data) {
          setErrors(err.data);
        } else {
          toast.error(err.message);
        }
      });
  };
  return (
    <div className="mt-5 row justify-content-center">
      <div className="login-box">
        <div className="login-logo">
          <b>Admin</b> Virtual Event
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmit={store} className="mb-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="text-danger">{errors?.email}</div>
              <div className="mb-3" />
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="text-danger">{errors?.password}</div>
              <div className="mb-3" />
              <button type="submit" className="btn btn-primary btn-block">
                Sign In
              </button>
            </form>

            <Link to="/register" className="text-center">
              Register a new membership
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
