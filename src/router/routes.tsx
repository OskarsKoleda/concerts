import { Route, Routes } from "react-router-dom";

import { EventDetailsPage } from "../pages/EventDetails/eventDetails.tsx";
import { EventList } from "../pages/EventList/eventList.tsx";
import { HomePage } from "../pages/Home/home";
import Layout from "../pages/Layout/layout";

import { ROUTE_LIST } from "./routes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTE_LIST.HOMEPAGE} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="events" element={<EventList />} />
        <Route path="events/new" element={<EventDetailsPage />} />
        <Route path="events/:id" element={<EventDetailsPage />} />
        <Route path="events/:id/edit" element={<EventDetailsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
