import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Root from "./pages/Root";
import { refreshToken, removeErrMessage } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken());
    dispatch(removeErrMessage());
  }, [dispatch]);

  return <Root />;
}

export default App;
