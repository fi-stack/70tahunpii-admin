import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { storeRegister } from "../../redux/action";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const store = (e) => {
    e.preventDefault();

    const form = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    };

    storeRegister(form)
      .then((res) => {
        toast.success(res.message);
        navigate("/login");
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
      <div className="register-box">
        <div className="register-logo">
          <b>Admin</b> Virtual Event
        </div>

        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new membership</p>

            <form onSubmit={store} className="mb-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
                  </div>
                </div>
              </div>
              <div className="text-danger">{errors?.name}</div>
              <div className="mb-3" />
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
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password Confirmation"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="text-danger">{errors?.password_confirmation}</div>

              <div className="mb-3" />
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
            </form>

            <Link to="/login" className="text-center">
              I already have a membership
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
