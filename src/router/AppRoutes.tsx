import { Route, Routes } from "react-router-dom";

import Auth from "../pages/Auth/Auth.tsx";
import EventDetails from "../pages/EventDetails/EventDetails.tsx";
import EventForm from "../pages/EventForm/EventForm.tsx";
import Events from "../pages/Events/Events.tsx";
import Homepage from "../pages/Homepage/Homepage.tsx";
import Layout from "../pages/Layout/Layout.tsx";

import { ROUTES } from "./routes.ts";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOMEPAGE} element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="auth" element={<Auth />} />
        <Route path="events" element={<Events />} />
        <Route path="events/new" element={<EventForm />} />
        <Route path="events/:slug/edit" element={<EventForm />} />
        <Route path="events/:slug" element={<EventDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
