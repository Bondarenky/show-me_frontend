import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Watched from "../pages/Watched";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Liked from "../pages/Liked";
import VideoDetails from "../pages/VideoDetails";
import MyProfile from "../pages/MyProfile";
import Followed from "../pages/Followed";
import ProtectedRoute from "../components/ProtectedRoute";
import Error from "../pages/Error";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'profile/:userId',
                element: <Profile />
            },
            {
                path: 'history',
                element: <ProtectedRoute>
                    <Watched />
                </ProtectedRoute>
            },
            {
                path: 'liked',
                element: <ProtectedRoute>
                    <Liked />
                </ProtectedRoute>
            },
            {
                path: 'sign-in',
                element: <Login />
            },
            {
                path: 'sign-up',
                element: <Register />
            },
            {
                path: 'video/:videoId',
                element: <VideoDetails />
            },
            {
                path: 'my-profile',
                element: <ProtectedRoute>
                    <MyProfile />
                </ProtectedRoute>
            },
            {
                path: "followed",
                element: <ProtectedRoute>
                    <Followed />
                </ProtectedRoute>
            }
        ]
    }
])