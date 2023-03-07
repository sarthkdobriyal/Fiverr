import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import MyOrders from "./pages/myOrders/MyOrders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import Add from "./pages/add/Add";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";


import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


import './App.scss'

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Footer from "./components/footer/Footer";


function App() {
  
  const Layout = () => {
    const queryClient = new QueryClient()
    return(
      <>
      <QueryClientProvider client={queryClient}>

      <Navbar />
      <Outlet />
      <Footer />
      </QueryClientProvider>
      </>
    )
  }
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[{
        path:"/",
        element: <Home />,
      },
      {
        path:"/gigs",
        element: <Gigs />,
      },
      {
        path:"/gig/:id",
        element: <Gig />,
      },
      {
        path:"/orders",
        element: <MyOrders />,
      },
      {
        path:"/mygigs",
        element: <MyGigs />,
      },
      {
        path:"/add",
        element: <Add />,
      },
      {
        path:"/messages",
        element: <Messages />,
      },
      {
        path:"messages/message/:id",
        element: <Message />,
      },
      {
        path:"/register",
        element: <Register/>,
      },
      {
        path:"/login",
        element: <Login />,
      },
      {
        path:"/pay/:id",
        element: <Pay />,
      },
      {
        path:"/success",
        element: <Success />,
      },
      ]
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
