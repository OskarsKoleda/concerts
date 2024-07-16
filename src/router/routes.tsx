import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/Home/home";
import { ConcertsPage } from "../pages/Concerts/concertsPage";
import { NewConcertPage } from "../pages/NewConcert/newConcert";
import Layout from "../pages/Layout/layout";
import { ROUTE_LIST } from "./routes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_LIST.HOMEPAGE} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="concerts" element={<ConcertsPage />} />
          <Route path="concerts/new" element={<NewConcertPage />} />
          <Route path="concerts/:id" element={<NewConcertPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
