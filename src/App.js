import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { refreshToken } from "./redux/authSlice";

function App() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  console.log(token);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Dashboard /> : <Login />}>
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
