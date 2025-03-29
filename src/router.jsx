import { createBrowserRouter } from "react-router-dom"
import ListClients from "./pages/ListClients/ListClients"; 
import CreateClients from "./pages/CreateClients/CreateClients"; 
import RootLayout from "./pages/layouts/RootLayout/RootLayout"

const router = createBrowserRouter([   {
    path: "/", 
    element: <RootLayout />, 
    children: [
        { index: true, element: <ListClients /> }, 
        { path: "create", element: <CreateClients /> } 
    ]
}
]);

export default router;