import { Route, Routes } from "react-router-dom";

import { ConcertDetailsPage } from "../pages/ConcertDetails/concertDetails";
import { ConcertList } from "../pages/ConcertList/concertList";
import { HomePage } from "../pages/Home/home";
import Layout from "../pages/Layout/layout";

import { ROUTE_LIST } from "./routes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTE_LIST.HOMEPAGE} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="concerts" element={<ConcertList />} />
        <Route path="concerts/new" element={<ConcertDetailsPage />} />
        <Route path="concerts/:id" element={<ConcertDetailsPage />} />
        <Route path="concerts/:id/edit" element={<ConcertDetailsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
