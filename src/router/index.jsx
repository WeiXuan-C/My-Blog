import Home from '../pages/Layout/Home'
import Profile from '../pages/Layout/Profile'
import User from '../pages/Layout/User'
import Publish from '../pages/Layout/Publish'
import Article from '../pages/Layout/Article'
import Login from '../pages/Login'
import Movie from '../pages/Layout/Movie'
import AuthRoute from '../components/AuthRoute';
import { createBrowserRouter } from 'react-router-dom';
import CreateMovie from '../pages/Layout/Movie/createMovie'
import DefaultMovie from '../pages/Layout/Movie/defaultMovie'

const router = createBrowserRouter([
    {
        path:"/",
        element:<AuthRoute><Home /></AuthRoute>,
        children:[
            {
                path:"",
                element:<Profile/>
            },
            {
                path:"movie",
                element:<Movie/>,
                children: [
                    {
                        // path: "defaultMovie",
                        index: true,
                        element: <DefaultMovie/>
                    },
                    {
                        path: "createMovie",
                        element: <CreateMovie/>
                    }
                ]

            },
            {
                path:"article",
                element:<Article/>
            },
            {
                path:"publish",
                element:<Publish/>
            },
            {
                path:"user",
                element:<User/>
            }
        ]
    },
    {
        path:"/login",
        element:<Login />
    },
])

export default router