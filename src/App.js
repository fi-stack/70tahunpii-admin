import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { GlobalApp, MainApp } from "./layouts";
import { Home, Login, Register, Dashboard, Participant } from "./pages";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<GlobalApp />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route path="dashboard" element={<MainApp />}>
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="participant" element={<MainApp />}>
              <Route index element={<Participant />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
