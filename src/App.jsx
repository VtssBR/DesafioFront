import { RouterProvider } from "react-router-dom";
import { ClientProvider } from "./contexts/ClientContext";
import { ContactProvider } from "./contexts/ContactContext";
import router from "./router";

function App() {

  return (
    <>
      <ClientProvider>
        <ContactProvider>
          <RouterProvider router={router} />
        </ContactProvider>
      </ClientProvider>
    </>
  )
}

export default App
