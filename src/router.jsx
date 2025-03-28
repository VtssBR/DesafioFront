import { createBrowserRouter } from "react-router-dom"
import ListClients from "./pages/ListClients"; 

const router = createBrowserRouter([{
    path: "/",
    //element: <RootLayout />,
    children: [
        { index: true, element: <ListClients/> },
    ]
}])

export default router;