import { createBrowserRouter } from "react-router-dom"
import ListClients from "./pages/ListClients/ListClients"; 
import CreateClients from "./pages/CreateClients/CreateClients"; 
import UpdateClients from "./pages/UpdateClients/UpdateClients"; 
import RootLayout from "./layouts/RootLayout/RootLayout"

const router = createBrowserRouter([   {
    path: "/", 
    element: <RootLayout />, 
    children: [
        { index: true, element: <ListClients /> }, 
        { path: "create", element: <CreateClients /> },
        { path: "update/:id", element: <UpdateClients /> } 
    ]
}
]);

export default router;