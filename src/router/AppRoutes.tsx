import { Route, Routes } from "react-router-dom";

import Auth from "../pages/Auth/Auth.tsx";
import { EventDetailsFormView } from "../pages/EventDetails/eventDetailsFormView/eventDetailsFormView.tsx";
import { EventDetailsView } from "../pages/EventDetails/eventDetailsView/eventDetailsView.tsx";
import EventList from "../pages/EventList/eventList.tsx";
import Homepage from "../pages/Homepage/Homepage.tsx";
import { Layout } from "../pages/Layout/Layout.tsx";

import { ROUTE_LIST } from "./routes.ts";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTE_LIST.HOMEPAGE} element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="auth" element={<Auth />} />
        <Route path="events" element={<EventList />} />
        <Route path="events/new" element={<EventDetailsFormView />} />
        <Route path="events/:id/edit" element={<EventDetailsFormView />} />
        <Route path="events/:id" element={<EventDetailsView />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
