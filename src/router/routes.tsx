import { Route, Routes } from "react-router-dom";

import { EventDetailsPage } from "../pages/ConcertDetails/eventDetails.tsx";
import { EventList } from "../pages/ConcertList/eventList.tsx";
import { HomePage } from "../pages/Home/home";
import Layout from "../pages/Layout/layout";

import { ROUTE_LIST } from "./routes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTE_LIST.HOMEPAGE} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="concerts" element={<EventList />} />
        <Route path="concerts/new" element={<EventDetailsPage />} />
        <Route path="concerts/:id" element={<EventDetailsPage />} />
        <Route path="concerts/:id/edit" element={<EventDetailsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
