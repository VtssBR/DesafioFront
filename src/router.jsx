import { createBrowserRouter } from "react-router-dom"
import ListClients from "./pages/ListClients"; 
import CreateClients from "./pages/CreateClients"; 
import UpdateClients from "./pages/UpdateClients"; 
import RootLayout from "./pages/RootLayout/RootLayout"
import ListContacts from "./pages/ListContacts"

const router = createBrowserRouter([   {
    path: "/", 
    element: <RootLayout />, 
    children: [
        { index: true, element: <ListClients /> },
        { path: "create", element: <CreateClients /> },
        { path: "update/:id", element: <UpdateClients /> },
        { path: "list/:id", element: <ListContacts /> }
    ]
}
]);

export default router;