import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import AddEventPage from "./components/AddEventPage";
import SearchEvent from "./components/SearchEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
      },
      {
        path: "/add-event",
        element: <AddEventPage />,
      },
      {
        path: "/search",
        element: <SearchEvent />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
