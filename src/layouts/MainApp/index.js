import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer, Navbar, Preloader, Sidebar } from "../../components";
import { getAdmin } from "../../redux/action";

const MainApp = () => {
  const adminToken = localStorage.getItem("admin-token");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!adminToken) {
      navigate("/login");
      window.location.reload();
    } else {
      setTimeout(() => {
        dispatch(getAdmin());
      }, 1000);
    }
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Preloader />
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainApp;
