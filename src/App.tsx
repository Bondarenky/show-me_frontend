import { RouterProvider } from "react-router-dom"
import { router } from "./router/router"
import "./index.css"
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper";
import { useGetUserQuery } from "./services/user.service";
import { useEffect } from "react";
import { login, logout } from "./store/user/userSlice";

function App() {
  const dispatch = useDispatch();
  const token = getTokenFromLocalStorage();
  const id = localStorage.getItem("userId");

  const { data: userData } = useGetUserQuery(id || "", {
    skip: !token || !id,
  });

  useEffect(() => {
    if (token) {
      dispatch(login({
        userId: id || "",
        accessToken: token
      }));
    } else {
      dispatch(logout());
    }
  }, [userData, dispatch, token, id]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
