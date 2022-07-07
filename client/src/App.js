import "./App.css";
import { Home } from "./pages/Home";
import { AuthContainer } from "./pages/AuthContainer";
import PrivateRoute from "./PrivateRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";
import { UserContext } from "./context/user.context";
import { Spinner } from "./components/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotFound } from "./pages/NotFound";

function App() {
  const { state } = useContext(AuthContext);
  const user = useContext(UserContext);
  return (
    <div className={`wrapper`}>
      {(state.loading || user.state.loading) && <Spinner />}
      {<ToastContainer />}
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthContainer />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
