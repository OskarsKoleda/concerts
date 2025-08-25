import { Route, Routes } from "react-router-dom";

import Auth from "../pages/Auth/Auth.tsx";
import { EventDetailsFormView } from "../pages/EventDetails/eventDetailsFormView/EventDetailsFormView.tsx";
import Homepage from "../pages/Homepage/Homepage.tsx";
import { Layout } from "../pages/Layout/Layout.tsx";

import EventDetailsView from "../pages/EventDetails/eventDetailsView/eventDetailsView.tsx";
import EventList from "../pages/EventList/EventList.tsx";
import { ROUTES } from "./routes.ts";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOMEPAGE} element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="auth" element={<Auth />} />
        <Route path="events" element={<EventList />} />
        <Route path="events/new" element={<EventDetailsFormView />} />
        <Route path="events/:slug/edit" element={<EventDetailsFormView />} />
        <Route path="events/:slug" element={<EventDetailsView />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
