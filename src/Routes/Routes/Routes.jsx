import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import Signup from "../../Pages/Signup/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../../Layout/DashboardLayout";
import MyAppointment from "../../Dashboard/MyAppointment/MyAppointment";
import Allusers from "../../Dashboard/Allusers/Allusers";
import AdminRoute from "../AdminRoute/AdminRoute";
import AddDoctor from "../../Dashboard/AddDoctor/AddDoctor";
import ManageDoctors from "../../Dashboard/Dashboard/ManageDoctors/ManageDoctors";
import AddDurgs from "../../Dashboard/AddDurgs/AddDurgs";
import ManageDrugs from "../../Dashboard/ManageDrugs/ManageDrugs";
import Payment from "../../Dashboard/Payment/Payment";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import DoctorPage from "../../Pages/DoctorPage/DoctorPage/DoctorPage";
import DrugsPage from "../../Pages/DrugsPage/DrugsPage/DrugsPage";
import MyRivews from "../../Dashboard/MyRivews/MyRivews";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        errorElement: <DisplayError />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/appointment',
                element: <Appointment />
            },
            {
                path: '/doctor',
                element: <DoctorPage />
            },
            {
                path: '/drugs',
                element: <DrugsPage />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError />,
        children: [
            {
                path: "/dashboard",
                element: <MyAppointment />
            },
            {
                path: "/dashboard/myreviews",
                element: <MyRivews />
            },
            {
                path: "/dashboard/users",
                element: <AdminRoute> <Allusers /></AdminRoute>
            },
            {
                path: "/dashboard/adddoctor",
                element: <AdminRoute><AddDoctor /></AdminRoute>
            },
            {
                path: "/dashboard/managedoctors",
                element: <AdminRoute> <ManageDoctors /> </AdminRoute>
            },
            {
                path: "/dashboard/adddurgs",
                element: <AdminRoute> <AddDurgs /> </AdminRoute>
            },
            {
                path: "/dashboard/managedrugs",
                element: <AdminRoute> <ManageDrugs /> </AdminRoute>
            },
            {
                path: "/dashboard/payment/:id",
                element: <Payment />,
                loader: ({params}) => fetch(`http://localhost:5000/bookings/${params.id}`)
            }
            
        ]
    }
])