const Navbar = () => {
  return (
    <nav className="main-header navbar navbar-expand navbar-dark">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" role="button">
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" data-widget="fullscreen" role="button">
            <i className="fas fa-expand-arrows-alt"></i>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="control-sidebar"
            data-slide="true"
            role="button"
          >
            <i className="fas fa-th-large"></i>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" role="button" onClick={() => alert("logout")}>
            <i className="fas fa-sign-out-alt"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
