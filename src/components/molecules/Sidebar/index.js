import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { admin } = useSelector((state) => state.admin);

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/dashboard" className="brand-link">
        <img
          src="/dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
        />
        <span className="brand-text font-weight-light">Portal Sepeda</span>
      </Link>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="/dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <div className="d-block">{admin?.name}</div>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-header">Participant</li>
            <li className="nav-item">
              <Link to="/participant" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Participant</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
