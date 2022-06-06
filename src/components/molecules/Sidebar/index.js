import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  exportNotYetPaid,
  exportPaymentRecap,
  podiumFastest,
} from "../../../redux/action";

const Sidebar = () => {
  const { admin } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

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
            <li className="nav-header">Peserta</li>
            <li className="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Pendaftar
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <Link to="/participant/run" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Lari</p>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/participant/ride" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Gowes</p>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/participant/run-ride" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Lari & Gowes</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Peserta
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <Link to="/participant/completed/run" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Lari</p>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/participant/completed/ride" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Gowes</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Rekap Peserta
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <Link
                    to="/participant/completed/run/by-location"
                    class="nav-link"
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Lari</p>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    to="/participant/completed/ride/by-location"
                    class="nav-link"
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Gowes</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/participant/expired" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Pendaftar Expired</p>
              </Link>
            </li>
            <li className="nav-header">Aktifitas</li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Aktifitas
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="/activities/run" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Lari</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="/activities/ride" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Gowes</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-header">Podium</li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Finisher
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="/finisher/run" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Lari</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="/finisher/ride" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Gowes</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-header">Unduh</li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                onClick={() => dispatch(exportPaymentRecap())}
              >
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Peserta (Bayar)</p>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                onClick={() => dispatch(exportNotYetPaid())}
              >
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Pendaftar (Belum Bayar)</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Podium Tercepat Lari
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a
                    href="#"
                    class="nav-link"
                    onClick={() =>
                      dispatch(podiumFastest("run", "male", "0-35"))
                    }
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Pria 0 - 35</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="#"
                    class="nav-link"
                    onClick={() =>
                      dispatch(podiumFastest("run", "male", "36-50"))
                    }
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Pria 36 - 50</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="#"
                    class="nav-link"
                    onClick={() =>
                      dispatch(podiumFastest("run", "male", "51-99"))
                    }
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Pria 51+</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="#"
                    class="nav-link"
                    onClick={() =>
                      dispatch(podiumFastest("run", "female", "0-35"))
                    }
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Perempuan 0 - 35</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="#"
                    class="nav-link"
                    onClick={() =>
                      dispatch(podiumFastest("run", "female", "36-50"))
                    }
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Perempuan 36 - 50</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="#"
                    class="nav-link"
                    onClick={() =>
                      dispatch(podiumFastest("run", "female", "51-99"))
                    }
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Perempuan 51+</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Podium Tercepat Gowes
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a
                    href="#"
                    class="nav-link"
                    onClick={() =>
                      dispatch(podiumFastest("ride", "male", "0-35"))
                    }
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Pria 0 - 35</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="#"
                    class="nav-link"
                    onClick={() =>
                      dispatch(podiumFastest("ride", "male", "36-50"))
                    }
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Pria 36 - 50</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="#"
                    class="nav-link"
                    onClick={() =>
                      dispatch(podiumFastest("ride", "male", "51-99"))
                    }
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Pria 51+</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="#"
                    class="nav-link"
                    onClick={() =>
                      dispatch(podiumFastest("ride", "female", "0-35"))
                    }
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Perempuan 0 - 35</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="#"
                    class="nav-link"
                    onClick={() =>
                      dispatch(podiumFastest("ride", "female", "36-50"))
                    }
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Perempuan 36 - 50</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="#"
                    class="nav-link"
                    onClick={() =>
                      dispatch(podiumFastest("ride", "female", "51-99"))
                    }
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Perempuan 51+</p>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
