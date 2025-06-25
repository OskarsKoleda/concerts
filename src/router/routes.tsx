import { Route, Routes } from "react-router-dom";

import { Auth } from "../pages/Auth/auth.tsx";
import { EventDetailsFormView } from "../pages/EventDetails/eventDetailsFormView/eventDetailsFormView.tsx";
import { EventDetailsView } from "../pages/EventDetails/eventDetailsView/eventDetailsView.tsx";
import EventList from "../pages/EventList/eventList.tsx";
import { HomePage } from "../pages/Home/home";
import { Layout } from "../pages/Layout/layout";

import { ROUTE_LIST } from "./routes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTE_LIST.HOMEPAGE} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="auth" element={<Auth />} />
        <Route path="events" element={<EventList />} />
        <Route path="events/new" element={<EventDetailsFormView />} />
        <Route path="events/:id" element={<EventDetailsView />} />
        <Route path="events/:id/edit" element={<EventDetailsFormView />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
