import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { GlobalApp, MainApp } from "./layouts";
import {
  Home,
  Login,
  Register,
  Dashboard,
  Participant,
  ParticipantExpired,
  ParticipantCompleted,
  ByLocation,
  Finisher,
  Activities,
  ActivityDetails,
} from "./pages";
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
            <Route path="participant/:type" element={<MainApp />}>
              <Route index element={<Participant />} />
            </Route>
            <Route path="participant/completed/:type" element={<MainApp />}>
              <Route index element={<ParticipantCompleted />} />
            </Route>
            <Route
              path="participant/completed/:type/by-location"
              element={<MainApp />}
            >
              <Route index element={<ByLocation />} />
            </Route>
            <Route path="participant/expired" element={<MainApp />}>
              <Route index element={<ParticipantExpired />} />
            </Route>
            <Route path="finisher/:type" element={<MainApp />}>
              <Route index element={<Finisher />} />
            </Route>
            <Route path="activities/:type" element={<MainApp />}>
              <Route index element={<Activities />} />
            </Route>
            <Route
              path="activity-details/:type/:athleteId/:name"
              element={<MainApp />}
            >
              <Route index element={<ActivityDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
